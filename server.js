import http from "http";
import apiSpeakers from "./api/speakers.js";
import apiTTS from "./api/tts.mp3.js";
import { createReadStream, readFileSync, statSync } from "fs";
import { randomUUID } from "crypto";

const kPort = process.env.PORT || 3000;
const kVersion = JSON.parse(readFileSync("package.json")).version;
const kSecretPath = process.env.SECRET_PATH || randomUUID().substring(0, 8);

const server = http.createServer((req, res) => {
  // 返回提示字符串
  const response = (msg) => {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(Buffer.from(msg, "utf8"));
  };

  // 修正请求 URL 中的转义字符
  req.url = req.url.replace("+text=", "&text=");

  // 校验 secret path
  const secretPath = req.url.split("/")[1];
  if (secretPath !== kSecretPath) {
    console.log("❌ 非法请求: " + req.url);
    return response("❌ 非法请求");
  }

  // 解析原始请求 URL
  req.url = req.url.split(kSecretPath)[1];
  const { pathname } = new URL("http://127.0.0.1" + req.url);
  const filePath = `public${pathname}`;

  let uri = withCatch(() => decodeURI(req.url));
  if (!uri) {
    console.log("❌ 请求路径解析异常: " + req.url);
    return response("❌ 请求路径解析异常");
  }
  
  console.log("🔥 " + uri);

  if (pathname.startsWith("/api/speakers")) {
    apiSpeakers(req, res);
  } else if (pathname.startsWith("/api/tts.mp3")) {
    apiTTS(req, res);
  } else if (exists(filePath)) {
    res.writeHead(200, {
      "Transfer-Encoding": "chunked",
      "Content-Type": "audio/mpeg",
    });
    const readStream = createReadStream(filePath);
    readStream.pipe(res);
  } else {
    response("✅ 服务已启动");
  }
});

server.listen(kPort, () => {
  console.log(
    [
      `MiGPT-TTS: v${kVersion}  by: del.wang`,
      `接口地址: http://localhost:${kPort}/${kSecretPath}/api`,
      "✅ 服务已启动...\n",
    ].join("\n\n")
  );
});

function exists(path) {
  try {
    return statSync(path).isFile();
  } catch (e) {
    return false;
  }
}

function withCatch(task, onError) {
  try {
    return task();
  } catch (error) {
    return onError?.(error);
  }
}
