# MiGPT-TTS

[![npm version](https://badge.fury.io/js/mi-gpt-tts.svg)](https://www.npmjs.com/package/mi-gpt-tts) [![Docker Image Version](https://img.shields.io/docker/v/idootop/mi-gpt-tts?color=%23086DCD&label=docker%20image)](https://hub.docker.com/r/idootop/mi-gpt-tts)

适用于 [MiGPT](https://github.com/idootop/mi-gpt) 的 TTS 模块，支持火山引擎、微软必应、OpenAI 等 TTS 服务。

## ⚡️ 快速开始

> 如果你是在 MiGPT 中使用，请查看 [🔥 MiGPT 配置第三方 TTS 教程](https://github.com/idootop/mi-gpt-tts/blob/main/docs/mi-gpt.md)

首先，安装 `mi-gpt-tts` 依赖

```shell
npm install mi-gpt-tts
```

示例代码：

```typescript
import { tts } from "mi-gpt-tts";
import { writeFile } from "fs/promises";

async function main() {
  const audioBuffer = await tts({
    speaker: "云希",
    text: "你好，很高兴认识你！",
    edge: {
      trustedToken: "6A5A-xxxx",
    },
  });
  await writeFile("output.mp3", audioBuffer);
}

main();
```

## 📖 使用文档

以下为更详细的使用教程，大多数问题都可在 [💬 常见问题](https://github.com/idootop/mi-gpt-tts/blob/main/docs/faq.md) 中找到答案。

- [🔥 MiGPT 配置第三方 TTS 教程](https://github.com/idootop/mi-gpt-tts/blob/main/docs/mi-gpt.md)
- [⚙️ 参数设置](https://github.com/idootop/mi-gpt-tts/blob/main/docs/settings.md)
- [💬 常见问题](https://github.com/idootop/mi-gpt-tts/blob/main/docs/faq.md)
- [🚀 Benchmark](https://github.com/idootop/mi-gpt-tts/blob/main/docs/benchmark.md)
- [🛠️ 本地开发](https://github.com/idootop/mi-gpt-tts/blob/main/docs/development.md)
- [🔗 接口定义](https://github.com/idootop/mi-gpt-tts/blob/main/docs/api.md)
- [✨ 更新日志](https://github.com/idootop/mi-gpt-tts/blob/main/docs/changelog.md)

## License

[MIT](https://github.com/idootop/mi-gpt-tts/blob/main/LICENSE) License © 2024-PRESENT Del Wang
