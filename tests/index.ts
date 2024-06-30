import { writeFile } from "fs/promises";
import { benchmark } from "./benchmark";

async function main() {
  const audioBuffer = await benchmark({
    times: 1,
    speaker: "云希",
  });
  if (audioBuffer) {
    await writeFile("test.mp3", audioBuffer);
  }
}

main();
