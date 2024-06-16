import { Readable } from "stream";
import { kVolcanoTTS } from "./volcano";

/**
 * 此处注册 TTS 服务提供商
 */
export const kTTSProviders: TTSProvider[] = [
  kVolcanoTTS, // 火山引擎，官方文档地址：https://www.volcengine.com/docs/6561/79817
];

export const kTTSSpeakers = kTTSProviders.reduce(
  (pre, s) => [...pre, ...s.speakers],
  [] as TTSSpeaker[]
);

export const kTTSDefaultText = "你好，很高兴认识你！";

export async function streamTTS(
  responseStream: Readable,
  options?: { text?: string; speaker?: string }
) {
  const { text, speaker } = options ?? {};
  const service = findSpeaker(speaker);
  return service.tts(responseStream, {
    text: text || kTTSDefaultText,
    speaker: service.speaker,
  });
}

/**
 * 初始化默认 TTS 音色
 */
let kDefaultSpeaker: CurrentTTSSpeaker;
const initDefaultSpeaker = () => {
  if (kDefaultSpeaker) {
    return;
  }
  if (process.env.TTS_DEFAULT_SPEAKER) {
    let speaker = "";
    const provider = kTTSProviders.find((e) => {
      const sp = e.speakers.find(
        (s) =>
          s.name === process.env.TTS_DEFAULT_SPEAKER ||
          s.speaker === process.env.TTS_DEFAULT_SPEAKER
      );
      if (sp) {
        speaker = sp?.speaker;
        return true;
      }
    });
    if (provider) {
      kDefaultSpeaker = { tts: provider.tts, speaker };
    }
  }
  kDefaultSpeaker = {
    tts: kTTSProviders[0].tts,
    speaker: kTTSProviders[0].speakers[0].speaker,
  };
};

/**
 * 根据 speaker 标识查找对应的 TTS 音色，支持根据音色名称和标识查找
 */
const findSpeaker = (speakerNameOrId?: string): CurrentTTSSpeaker => {
  initDefaultSpeaker();
  let speaker = kDefaultSpeaker.speaker;
  const provider = kTTSProviders.find((e) => {
    const sp = e.speakers.find(
      (s) => s.name === speakerNameOrId || s.speaker === speakerNameOrId
    );
    if (sp) {
      speaker = sp?.speaker;
      return true;
    }
  });
  return provider ? { tts: provider.tts, speaker } : kDefaultSpeaker;
};

type TTSBuilder = (
  responseStream: Readable,
  options?: { text?: string; speaker?: string }
) => Promise<any>;

export interface TTSSpeaker {
  /**
   * 音色名称
   */
  name?: string;
  /**
   * 音色性别分类，男女（可选）
   */
  gender?: string;
  /**
   * 音色标识
   */
  speaker: string;
}

export interface TTSProvider {
  name: string;
  speakers: TTSSpeaker[];
  tts: TTSBuilder;
}

export interface CurrentTTSSpeaker {
  speaker: string;
  tts: TTSBuilder;
}
