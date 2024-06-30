import { writeFile } from "fs/promises";
import { benchmark } from "./benchmark";

// 【 火山引擎 | 灿灿 】 124 个字 平均耗时 0.42s
// 【 火山引擎 | 燃燃二 】 124 个字 平均耗时 0.43s
// 【 火山引擎 | 通用男声 】 124 个字 平均耗时 0.48s
// 【 火山引擎 | 东北老铁 】 124 个字 平均耗时 0.52s

// 【 微软必应 | 小艺 】 124 个字 平均耗时 1.34s
// 【 微软必应 | 云希 】 124 个字 平均耗时 1.5s
// 【 微软必应 | 小小 】 124 个字 平均耗时 1.68s
// 【 微软必应 | 陕西小妮 】 124 个字 平均耗时 1.5s
// 【 微软必应 | 辽宁小北 】 124 个字 平均耗时 1.39s

// 【 OpenAI | Alloy 】 124 个字 平均耗时 4.2s
// 【 OpenAI | Echo 】 124 个字 平均耗时 4.9s

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
