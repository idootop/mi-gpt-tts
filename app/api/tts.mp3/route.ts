import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import { streamTTS } from "../../tts";

export async function GET(request: NextRequest) {
  const options: any = {};
  const url = new URL(request.url.replace("+text=", "&text="));
  for (const [key, value] of url.searchParams.entries()) {
    options[key] = value;
  }

  const audioStream = new Readable({ read() {} });
  const outStream = Readable.toWeb(audioStream) as ReadableStream<any>;

  streamTTS(audioStream, options).catch(() => {});

  return new NextResponse(outStream, {
    status: 200,
    headers: {
      "Transfer-Encoding": "chunked",
      "Content-Type": "audio/mp3",
    },
  });
}
