# 🔥 MiGPT 配置教程

### 1. 创建火山引擎语音合成账号

首先，登录注册火山引擎：https://console.volcengine.com/auth/signup

然后，在产品列表搜索「语音合成」，选择「语音技术」，创建应用，勾选「语音合成」。

<details>
<summary>👉 查看教程</summary>

![](https://raw.githubusercontent.com/idootop/mi-gpt-tts/main/screenshots/1.search.jpg)

![](https://raw.githubusercontent.com/idootop/mi-gpt-tts/main/screenshots/2.create.jpg)

![](https://raw.githubusercontent.com/idootop/mi-gpt-tts/main/screenshots/3.token.jpg)

</details>

> 注意：账号注册成功之后，请先在个人中心完成实名认证，然后才能创建语音合成应用。

### 2. 配置环境变量

重命名本项目根目录下的 [.env.example](https://github.com/idootop/mi-gpt-tts/blob/main/.env.example) 文件为 `.env`。

然后，将里面的环境变量修改成你自己的，参数含义如下：

| 环境变量名称               | 描述                                                                                                | 示例                            |
| -------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------- |
| `VOLCANO_TTS_APP_ID`       | 火山引擎语音合成 APP ID                                                                             | `123456`                        |
| `VOLCANO_TTS_ACCESS_TOKEN` | 火山引擎语音合成 Access Token                                                                       | `xxxxxx`                        |
| `TTS_DEFAULT_SPEAKER`      | （可选）默认音色名称或 ID（查看完整[音色列表](https://www.volcengine.com/docs/6561/97465)和费用详情） | `BV700_streaming`               |
| `SECRET_PATH`              | （可选）接口访问秘密路径，相当于访问密码。推荐长度大于 6，由字母、数字、- 和 \_ 组成，为空时每次启动随机生成。    | `Are-You-OK` (不要直接用这个！) |

> 注意：出于安全考虑，从 v3.0.0 版本开始，访问语音合成接口需要带上 `SECRET_PATH` 防止他人盗刷接口。
> 如果 `SECRET_PATH` 环境变量为空，每次启动服务则会生成随机访问密码。

### 3. 部署 MiGPT-TTS 服务

[![Docker Image Version](https://img.shields.io/docker/v/idootop/mi-gpt-tts?color=%23086DCD&label=docker%20image)](https://hub.docker.com/r/idootop/mi-gpt-tts)

环境变量配置完成后，请在对应目录运行以下命令，启动服务：

```shell
docker run -d --env-file $(pwd)/.env -p 4321:3000 idootop/mi-gpt-tts:latest
```

启动成功后，可在控制台的日志输出中查看接口地址，比如：

```shell
MiGPT-TTS: v3.0.0  by: del.wang

接口地址：http://localhost:3000/7a0e9f21/api

✅ 服务已启动...
```

访问 `http://[IP]:[PORT]/[SECRET_PATH]/api/tts.mp3` 即可查看语音合成效果。

> 注意：这里的端口（PORT）是你为 Docker 分配的实际端口，不推荐使用默认的 4321 端口。<br/>
> 如果你是通过 Node.js 本地启动本项目，则默认端口为 `3000`。

### 4. 修改 MiGPT 默认 TTS 引擎

你可以通过以下步骤，切换 `MiGPT` 使用的 TTS 引擎：

1. 配置 `TTS_BASE_URL` 环境变量
2. 切换 `speaker.tts` 为 `custom`

```js
// mi-gpt/.env
TTS_BASE_URL=http://[IP]:[PORT]/[SECRET_PATH]/api

// mi-gpt/.migpt.js
export default {
  speaker: {
    // TTS 引擎
    tts: 'custom',
    // ...
  },
};
```

如果你的 `MiGPT-TTS` 服务与小爱音箱处在同一局域网下，那么也可以使用局域网地址。

> 注意：本项目中的部分音色名称，与火山引擎官方文档中的名称并不一致，完整的音色列表和名称以此处为准：[volcano.ts](https://github.com/idootop/mi-gpt-tts/blob/main/src/tts/volcano.ts)

### 5. （可选）更新 MiGPT 提示音效链接

本项目内置了一些 `MiGPT` 使用的默认提示音效，部署成功后你可以使用提示音效替换原来的文字提示语。

```shell
# mi-gpt/.env
AUDIO_SILENT=http://[IP]:[PORT]/[SECRET_PATH]/slient.wav
AUDIO_BEEP=http://[IP]:[PORT]/[SECRET_PATH]/beep.wav
AUDIO_ACTIVE=http://[IP]:[PORT]/[SECRET_PATH]/active.wav
AUDIO_ERROR=http://[IP]:[PORT]/[SECRET_PATH]/error.wav
```
