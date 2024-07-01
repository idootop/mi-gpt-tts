# v3.0.0

## 🚨 风险预警

根据用户反馈，有人正在根据  `MiGPT-TTS` 默认 `4321` 端口 + API 路径特征，搜集公网上的相关服务资产。

出于安全考虑，`MiGPT-TTS` 从 v3.0.0 版本开始，访问语音合成接口需要带上 `SECRET_PATH` 防止他人盗刷接口。

如果你正在公网使用旧版 `MiGPT-TTS`，建议立即更新到 v3.0.0 版本，防止接口被盗刷。

## ✨ 更新内容

- ✅ 新增 `SECRET_PATH` 接口访问凭证，防止接口被盗刷
- ✅ 优化接口访问提示文案

# v2.0.0

新增对 [edge-tts](https://github.com/rany2/edge-tts) 和 [OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech) 的支持，相关配置参数请[在此查看](https://github.com/idootop/mi-gpt-tts/blob/main/docs/settings.md)。

## ✨ 新功能

- 支持微软必应 TTS
- 支持 OpenAI TTS
- 发布 NPM Package
- 支持网络请求 Proxy
- 添加语音合成 Benchmark

## ❤️ 感谢

- @ProgramFan 提交的适配 OpenAI TTS 的 [PR](https://github.com/idootop/mi-gpt-tts/pull/5)

# v1.0.0

- 支持火山引擎 TTS
