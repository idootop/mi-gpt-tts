// TTS 代码参考自：https://github.com/CodeF53/edge-tts/blob/main/index.ts

import { randomUUID } from "crypto";
import WebSocket from "ws";
import { TTSBuilder, TTSProvider, TTSSpeaker } from "../common/type";
import { createStreamHandler } from "../common/stream";

// 微软必应 Read Aloud 音色列表：
// https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/voices/list?trustedclienttoken=${your-trust-token}
const kEdgeTTSSpeakers: TTSSpeaker[] = [
  {
    name: "云希",
    speaker: "zh-CN-YunxiNeural",
    gender: "男",
  },
  {
    name: "陕西小妮",
    speaker: "zh-CN-shaanxi-XiaoniNeural",
    gender: "女",
  },
  {
    name: "小小",
    speaker: "zh-CN-XiaoxiaoNeural",
    gender: "女",
  },
  {
    name: "小艺",
    speaker: "zh-CN-XiaoyiNeural",
    gender: "女",
  },
  {
    name: "云健",
    speaker: "zh-CN-YunjianNeural",
    gender: "男",
  },
  {
    name: "云夏",
    speaker: "zh-CN-YunxiaNeural",
    gender: "男",
  },
  {
    name: "云扬",
    speaker: "zh-CN-YunyangNeural",
    gender: "男",
  },
  {
    name: "辽宁小北",
    speaker: "zh-CN-liaoning-XiaobeiNeural",
    gender: "女",
  },
  {
    name: "小珍",
    speaker: "zh-TW-HsiaoChenNeural",
    gender: "女",
  },
  {
    name: "云哲",
    speaker: "zh-TW-YunJheNeural",
    gender: "男",
  },
  {
    name: "小宇",
    speaker: "zh-TW-HsiaoYuNeural",
    gender: "男",
  },
];

const kAPI =
  "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";

export const edgeTTS: TTSBuilder = async ({
  edge,
  text,
  speaker,
  stream: responseStream,
}) => {
  const token = edge?.trustedToken;
  if (!token) {
    console.log("❌ 找不到微软必应 TTS 环境变量：EDGE_TTS_TRUSTED_TOKEN");
    return null;
  }

  const streamHandler = createStreamHandler(responseStream);

  try {
    const ws = new WebSocket(
      `${kAPI}?TrustedClientToken=${token}&ConnectionId=${randomUUID()}`,
      {
        host: "speech.platform.bing.com",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36 Edg/103.0.1264.44",
        },
      }
    );

    ws.on("message", (rawData: Buffer, isBinary) => {
      if (!isBinary) {
        const data = rawData.toString("utf8");
        if (data.includes("turn.end")) {
          ws.close();
        }
        return;
      }
      const separator = "Path:audio\r\n";
      const audioData = rawData.subarray(
        rawData.indexOf(separator) + separator.length
      );
      if (audioData.length > 0) {
        streamHandler.push(audioData);
      }
    });

    ws.on("error", (err) => {
      streamHandler.error(err, "Edge | WebSocket error");
    });

    ws.on("close", () => {
      streamHandler.end();
    });

    ws.on("open", () => {
      const request = getEdgeTTSMessages({ text, speaker });
      ws.send(request.config, { compress: true }, (configError) => {
        if (configError) {
          streamHandler.error(configError, "Edge | Send config msg failed!");
          return;
        }
        ws.send(request.ssml, { compress: true }, (ssmlError) => {
          if (ssmlError) {
            streamHandler.error(ssmlError, "Edge | Send ssml msg failed!");
          }
        });
      });
    });
  } catch (err) {
    streamHandler.error(err, "Edge | Unknown error");
  }

  return streamHandler.result;
};

function getEdgeTTSMessages(options: {
  text: string;
  speaker?: string;
  volume?: string;
  rate?: string;
  pitch?: string;
}) {
  const {
    text,
    speaker = "zh-CN-YunxiNeural",
    volume = "+0%",
    rate = "+0%",
    pitch = "+0Hz",
  } = options;
  const speechConfig = JSON.stringify({
    context: {
      synthesis: {
        audio: {
          outputFormat: "audio-24khz-48kbitrate-mono-mp3",
          metadataoptions: {
            sentenceBoundaryEnabled: false,
            wordBoundaryEnabled: false,
          },
        },
      },
    },
  });

  const configMessage = `X-Timestamp:${Date()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n${speechConfig}`;
  const ssmlMessage =
    `X-RequestId:${randomUUID()}\r\nContent-Type:application/ssml+xml\r\n` +
    `X-Timestamp:${Date()}Z\r\nPath:ssml\r\n\r\n` +
    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>` +
    `<voice name='${speaker}'><prosody pitch='${pitch}' rate='${rate}' volume='${volume}'>` +
    `${text}</prosody></voice></speak>`;
  return {
    config: configMessage,
    ssml: ssmlMessage,
  };
}

export const kEdgeTTS: TTSProvider = {
  name: "微软必应 TTS",
  tts: edgeTTS,
  speakers: kEdgeTTSSpeakers,
};
