import axios from "axios";
import { Readable } from "stream";
import { kTTSDefaultText, TTSProvider, TTSSpeaker } from "./type";

const kOpenAITTSSpeakers: TTSSpeaker[] = [
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

export const kOpenAITTS: TTSProvider = {
  name: "OpenAI TTS",
  tts: openAITTS,
  speakers: kOpenAITTSSpeakers,
};

export async function openAITTS(
  responseStream: Readable,
  options?: { text?: string; speaker?: string },
) {
  const { text, speaker } = options ?? {};

  const requestPayload = {
    model: "tts-1",
    input: text || kTTSDefaultText,
    voice: speaker || "alloy",
    response_format: "mp3",
  };

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    console.log("❌ Missing OpenAI API key");
    responseStream.push("404");
    responseStream.push(null);
    return;
  }
  const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL
    ?? "https://api.openai.com/v1";
  const kAPI = OPENAI_BASE_URL + "/audio/speech";

  try {
    const response = await axios.post(kAPI, requestPayload, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    });

    if (response.status === 200) {
      responseStream.push(response.data);
      responseStream.push(null);
      console.log("✅ TTS generated successfully with " + speaker);
    } else {
      console.log("❌ TTS generation failed with status:", response.status);
      responseStream.push("404");
      responseStream.push(null);
    }
  } catch (err) {
    console.log("❌ Error during TTS generation:", err);
    responseStream.push("404");
    responseStream.push(null);
  }
}
