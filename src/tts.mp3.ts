import { Readable } from "stream";
import { createTTS } from ".";

const tts = createTTS({
  defaultSpeaker: process.env.TTS_DEFAULT_SPEAKER,
  volcano: {
    appId: process.env.VOLCANO_TTS_APP_ID!,
    accessToken: process.env.VOLCANO_TTS_ACCESS_TOKEN!,
    userId: process.env.VOLCANO_TTS_USER_ID,
  },
  edge: {
    trustedToken: process.env.EDGE_TTS_TRUSTED_TOKEN!,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
    model: process.env.OPENAI_TTS_MODEL,
    baseUrl: process.env.OPENAI_BASE_URL,
  },
});

export default async function handler(request, response) {
  const options: any = {};
  const url = new URL("http://127.0.0.1" + request.url);
  for (const [key, value] of url.searchParams.entries()) {
    options[key] = value;
  }

  const audioStream = new Readable({ read() {} });
  options.stream = audioStream;

  tts(options); // 语音合成

  response.writeHead(200, {
    "Transfer-Encoding": "chunked",
    "Content-Type": "audio/mp3",
  });

  audioStream.pipe(response);
}
