import { Readable } from "stream";

export type TTSBuilder = (options: {
  stream: Readable;
  text: string;
  speaker: string;
}) => Promise<Uint8Array | undefined>;

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
