import { volcanoTTS } from "@/app/tts/volcano";
import { writeFile } from "fs/promises";
import { Readable } from "stream";

async function main() {
  const audioStream = new Readable({ read() {} });
  const audioBuffer = await volcanoTTS(audioStream, {
    text: "你好，很高兴认识你。",
  });
  if (audioBuffer) {
    await writeFile("hello.mp3", audioBuffer);
  }
}

main();
