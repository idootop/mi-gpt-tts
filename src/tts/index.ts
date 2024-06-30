import { Readable } from "stream";
import { kVolcanoTTS } from "./volcano";
import { TTSProvider, TTSSpeaker } from "../common/type";
import { findSpeakerProvider } from "../common/speaker";
import { kTTSDefaultText } from "../common/const";
import { kEdgeTTS } from "./edge";

/**
 * 此处注册 TTS 服务提供商
 */
export const kTTSProviders: TTSProvider[] = [
  kVolcanoTTS, // 火山引擎，官方文档地址：https://www.volcengine.com/docs/6561/79817
  kEdgeTTS, // 微软必应 Read Aloud，官方简介：https://www.microsoft.com/zh-cn/edge/features/read-aloud
];

export const kTTSSpeakers = kTTSProviders.reduce(
  (pre, s) => [...pre, ...s.speakers],
  [] as TTSSpeaker[]
);

export async function tts(options: {
  stream?: Readable;
  text?: string;
  speaker?: string;
}) {
  const { text, speaker, stream = new Readable({ read() {} }) } = options;
  const service = findSpeakerProvider(speaker);
  return service.tts(stream, {
    text: text || kTTSDefaultText,
    speaker: service.speaker,
  });
}
