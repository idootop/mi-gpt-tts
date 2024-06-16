# MiGPT-TTS

适用于 [MiGPT](https://github.com/idootop/mi-gpt) 的 TTS 模块，支持火山引擎 21 款免费音色。

## ⚡️ 快速开始

### 1. 创建火山引擎语音合成账号

首先，登录注册火山引擎：https://console.volcengine.com/auth/signup

然后，在产品列表搜索「语音合成」，选择「语音技术」，创建应用，勾选「语音合成」。

> 注意：账号注册成功之后，请先在个人中心完成实名认证，然后才能创建语音合成应用。

![](https://raw.githubusercontent.com/idootop/mi-gpt-tts/main/screenshots/1.search.jpg)

![](https://raw.githubusercontent.com/idootop/mi-gpt-tts/main/screenshots/2.create.jpg)

![](https://raw.githubusercontent.com/idootop/mi-gpt-tts/main/screenshots/3.token.jpg)

### 2. 配置环境变量

重命名本项目根目录下的 [.env.example](https://github.com/idootop/mi-gpt-tts/blob/main/.env.example) 文件为 `.env`。

然后，将里面的环境变量修改成你自己的，参数含义如下：

| 环境变量名称               | 描述                                                                                                | 示例              |
| -------------------------- | --------------------------------------------------------------------------------------------------- | ----------------- |
| `VOLCANO_TTS_APP_ID`       | 火山引擎语音合成 APP ID                                                                             | `123456`          |
| `VOLCANO_TTS_ACCESS_TOKEN` | 火山引擎语音合成 Access Token                                                                       | `xxxxxx`          |
| `TTS_DEFAULT_SPEAKER`      | 默认音色名称或 ID（可选，查看完整[音色列表](https://www.volcengine.com/docs/6561/97465)和费用详情） | `BV700_streaming` |

### 3. 部署 MiGPT-TTS 服务

考虑到国内网络访问 [Vercel](https://vercel.com) 并不友好，此处仅提供 Docker 部署方式。

[![Docker Image Version](https://img.shields.io/docker/v/idootop/mi-gpt-tts?color=%23086DCD&label=docker%20image)](https://hub.docker.com/r/idootop/mi-gpt-tts)

```shell
docker run -d --env-file $(pwd)/.env -p 4321:3000 idootop/mi-gpt-tts:latest
```

启动成功后，访问 `http://[你的公网/局域网地址]:4321/api/tts.mp3` 即可查看语音合成效果（hello world）

### 4. 修改 MiGPT 默认 TTS 引擎

你可以通过以下步骤，切换 `MiGPT` 使用的 TTS 引擎：

1. 配置 `TTS_BASE_URL` 环境变量
2. 切换 `speaker.tts` 为 `custom`

```js
// mi-gpt/.env
TTS_BASE_URL=http://[你的公网/局域网地址]:[端口号]/api

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

### 5. （可选）更新 MiGPT 提示音效链接

本项目内置了一些 `MiGPT` 使用的默认提示音效，部署成功后你可以使用提示音效替换原来的文字提示语。

```shell
# mi-gpt/.env
AUDIO_SILENT=http://[你的公网/局域网地址]:[端口号]/slient.wav
AUDIO_BEEP=http://[你的公网/局域网地址]:[端口号]/beep.wav
AUDIO_ACTIVE=http://[你的公网/局域网地址]:[端口号]/active.wav
AUDIO_ERROR=http://[你的公网/局域网地址]:[端口号]/error.wav
```

## 🛠️ 本地开发

如果你想要修改代码，添加对更多 TTS 引擎的支持（比如 ChatTTS、OpenAI 等），可以参考以下本地开发教程。

### 初始化

```shell
# 克隆项目到本地
git clone https://github.com/idootop/mi-gpt-tts.git
cd mi-gpt-tts

# 安装依赖
pnpm install

# 启动项目
pnpm start
```

### 本地调试

在 VS Code 中打开本项目，然后在 `tests/index.ts` 配置好你想要调试的模块，然后按 F5 即可下断调试代码。

或者，你可以使用 `pnpm dev` 命令启动 dev server 调试相关接口，支持热更新。

### 构建镜像

此项目默认支持 `linux/amd64`, `linux/arm64` 和 `linux/arm32/v7`，可使用以下命令构建指定平台的镜像：

```shell
# 构建产物
pnpm build

# 构建镜像
docker build --platform linux/arm/v7 -t mi-gpt-tts .
```

运行构建后的 Docker 镜像

```shell
docker run -d --env-file $(pwd)/.env -p 4321:3000 mi-gpt-tts
```

## 🔗 接口定义

本项目主要实现了 `MiGPT` 用到的以下两个接口规范：

### GET /api/tts.mp3

文字合成音频，请求示例：`/api/tts.mp3?speaker=BV700_streaming&text=很高兴认识你`

其中，请求参数 `speaker` 为指定音色名称或标识，可选。

### GET /api/speakers

获取音色列表

| 属性    | 说明     | 示例              |
| ------- | -------- | ----------------- |
| name    | 音色名称 | `灿灿`            |
| gender  | 性别     | `女`              |
| speaker | 音色标识 | `BV700_streaming` |

返回值示例

```json
[
  {
    "name": "广西老表",
    "gender": "男",
    "speaker": "BV213_streaming"
  },
  {
    "name": "甜美台妹",
    "gender": "女",
    "speaker": "BV025_streaming"
  }
]
```

## License

[MIT](https://github.com/idootop/mi-gpt/blob/main/LICENSE) License © 2024-PRESENT Del Wang
