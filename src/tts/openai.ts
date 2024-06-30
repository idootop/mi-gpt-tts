import { TTSBuilder, TTSProvider, TTSSpeaker } from "../common/type";
import { createStreamHandler } from "../common/stream";
import { fetch } from "node-fetch-native/proxy";

// OpenAI TTS 音色列表：https://platform.openai.com/docs/guides/text-to-speech
const kOpenAISpeakers: TTSSpeaker[] = [
  {
    name: "Alloy",
    gender: "男",
    speaker: "alloy",
  },
  {
    name: "Echo",
    gender: "男",
    speaker: "echo",
  },
  {
    name: "Fable",
    gender: "男",
    speaker: "fable",
  },
  {
    name: "Onyx",
    gender: "男",
    speaker: "onyx",
  },
  {
    name: "Nova",
    gender: "女",
    speaker: "nova",
  },
  {
    name: "Shimmer",
    gender: "女",
    speaker: "shimmer",
  },
];

export const openaiTTS: TTSBuilder = async ({
  openai,
  text,
  speaker,
  stream: responseStream,
}) => {
  const key = openai?.apiKey;
  const model = openai?.model ?? "tts-1";
  const baseUrl = openai?.baseUrl ?? "https://api.openai.com/v1";

  if (!key) {
    console.log("❌ 找不到 OpenAI TTS 环境变量：OPENAI_API_KEY");
    return;
  }

  const streamHandler = createStreamHandler(responseStream);

  fetch(`${baseUrl}/audio/speech`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: text,
      voice: speaker,
    }),
  })
    .catch((error) => error)
    .then(async (resp) => {
      const stream = resp?.body;
      if (!stream) {
        streamHandler.error(resp, "OpenAI | Get stream body failed!");
        return;
      }
      const reader = stream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (value) {
            streamHandler.push(value);
          }
          if (done) {
            streamHandler.end();
            break;
          }
        }
      } catch (err) {
        streamHandler.error(resp, "OpenAI | Read stream failed!");
      } finally {
        reader.releaseLock();
      }
    });

  return streamHandler.result;
};

export const kOpenAI: TTSProvider = {
  name: "OpenAI TTS",
  tts: openaiTTS,
  speakers: kOpenAISpeakers,
};
