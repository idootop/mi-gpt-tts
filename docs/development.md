# 🛠️ 本地开发

如果你想要修改代码，添加对更多 TTS 引擎的支持（比如 ChatTTS、百度、讯飞 等），可以参考以下本地开发教程。

## 初始化

```shell
# 克隆项目到本地
git clone https://github.com/idootop/mi-gpt-tts.git
cd mi-gpt-tts

# 安装依赖
pnpm install

# 构建项目
pnpm run build

# 启动项目
pnpm run start
```

## 本地调试

在 VS Code 中打开本项目，然后在 `tests/index.ts` 配置好你想要调试的模块，然后按 F5 即可下断调试代码。

### 构建镜像

此项目默认支持 `linux/amd64`, `linux/arm64` 和 `linux/arm32/v7`，可使用以下命令构建指定平台的镜像：

```shell
docker build --platform linux/arm/v7 -t mi-gpt-tts .
```

运行构建后的 Docker 镜像

```shell
docker run -d --env-file $(pwd)/.env -p 4321:3000 mi-gpt-tts
```
