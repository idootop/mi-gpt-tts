# ⚙️ 环境变量

重命名本项目根目录下的 [.env.example](https://github.com/idootop/mi-gpt-tts/blob/main/.env.example) 文件为 `.env`。

然后，将里面的环境变量修改成你自己的，参数含义如下：

| 环境变量名称               | 描述                                                                                 | 示例                        |
| -------------------------- | ------------------------------------------------------------------------------------ | --------------------------- |
| `TTS_DEFAULT_SPEAKER`      | 可选，默认音色名称                                                                   | `东北老铁`                  |
| **火山引擎（Volcano）**    |                                                                                      |                             |
| `VOLCANO_TTS_APP_ID`       | 火山引擎语音合成 APP ID                                                              | `123456`                    |
| `VOLCANO_TTS_ACCESS_TOKEN` | 火山引擎语音合成 Access Token                                                        | `seJxxxxxxx`                |
| `VOLCANO_TTS_USER_ID`      | 可选，火山引擎账号 ID                                                                | `123456789`                 |
| **微软必应（Read Aloud）** |                                                                                      |                             |
| `EDGE_TTS_TRUSTED_TOKEN`   | 你的必应 trust token，可在[rany2/edge-tts](https://github.com/rany2/edge-tts) 中查找 | `6A5A-xxxx`                 |
| **OpenAI**                 |                                                                                      |                             |
| `OPENAI_API_KEY`           | OpenAI API 密钥                                                                      | `sk-proj-xxxx`              |
| `OPENAI_TTS_MODEL`         | 可选， OpenAI TTS 模型，`tts-1`（速度快） 或 `tts-1-hd`（质量好）                    | `tts-1`                     |
| `OPENAI_BASE_URL`          | 可选，OpenAI API BaseURL                                                             | `https://api.openai.com/v1` |
