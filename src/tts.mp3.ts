import { Readable } from "stream";
import { tts } from "./tts";

export default async function handler(request, response) {
  const options: any = {};
  const url = new URL("http://127.0.0.1" + request.url);
  for (const [key, value] of url.searchParams.entries()) {
    options[key] = value;
  }

  const audioStream = new Readable({ read() {} });
  options.stream = audioStream;
  tts(options).catch(() => {});

  response.writeHead(200, {
    "Transfer-Encoding": "chunked",
    "Content-Type": "audio/mp3",
  });

  audioStream.pipe(response);
}
