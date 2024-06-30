import { kTTSProviders } from "..";
import { CurrentTTSSpeaker, TTSSpeaker } from "./type";

/**
 * 根据 speaker 标识查找对应的 TTS 音色，支持根据音色名称和标识查找
 */
export const findTTSProvider = (
  speakerNameOrId?: string,
  defaultSpeaker?: string
): CurrentTTSSpeaker => {
  initDefaultSpeaker(defaultSpeaker);
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

/**
 * 查找音色列表中的对应音色名称，支持根据音色名称和标识查找
 */
export const findSpeaker = (speakers: TTSSpeaker[], speaker?: string) => {
  return (
    speakers.find((e) => e.speaker === speaker || e.name === speaker)
      ?.speaker ?? speakers[0].speaker
  );
};

/**
 * 初始化默认 TTS 音色
 */
let kDefaultSpeaker: CurrentTTSSpeaker;
const initDefaultSpeaker = (defaultSpeaker?: string) => {
  if (kDefaultSpeaker) {
    return;
  }
  if (defaultSpeaker) {
    let speaker = "";
    const provider = kTTSProviders.find((e) => {
      const sp = e.speakers.find(
        (s) => s.name === defaultSpeaker || s.speaker === defaultSpeaker
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
  kDefaultSpeaker ??= {
    tts: kTTSProviders[0].tts,
    speaker: kTTSProviders[0].speakers[0].speaker,
  };
};
