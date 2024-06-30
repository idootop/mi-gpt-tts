import { tts } from "@/src/tts";

export async function benchmark(options?: {
  speaker?: string;
  times?: number;
  textLength?: number;
}) {
  let result;
  const { speaker = "灿灿", times = 10, textLength = 124 } = options ?? {};
  const text = generateText(textLength);
  const final = await withTimeUsage(async () => {
    for (let i = 0; i < times; i++) {
      const res = await withTimeUsage(async () => {
        return tts({ text, speaker });
      });
      if ((res.data?.byteLength ?? 0) > 10) {
        result = res.data;
        console.log(
          `🔥 ${speaker} ${i + 1} 用时：${(res.time / 1000).toFixed(2)}s`
        );
      } else {
        console.log(
          `❌ ${speaker} ${i + 1} 用时：${(res.time / 1000).toFixed(2)}s`
        );
      }
    }
    return result;
  });
  const total = (final.time / 1000).toFixed(2);
  const average = (final.time / 1000 / times).toFixed(2);
  console.log(`✅ ${speaker} 总用时：${total}s 平均用时：${average}s`);
  return result;
}

/**
 * 计算耗时，单位：毫秒
 */
async function withTimeUsage<T = any>(task: () => Promise<T>) {
  const start: any = new Date();
  const data = await task();
  const end: any = new Date();
  return { data, time: end - start };
}

/**
 * 生成指定长度的文本
 *
 * 文字内容节选自路遥的《平凡的世界》第一自然段。
 */
function generateText(len = 124) {
  let text =
    "一九七五年，二三月间，一个平平常常的日子，细蒙蒙的雨丝夹着一星半点的雪花，正纷纷淋淋地向大地飘洒着。时令已快到惊蛰，雪当然再不会存留，往往还没等落地，就已经消失得无踪无影了。黄土高原严寒而漫长的冬天看来就要过去，但那真正温暖的春天还远远地没有到来。";
  while (text.length < len) {
    text += text;
  }
  return text.substring(0, len);
}
