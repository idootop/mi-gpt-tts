import { randomUUID } from "crypto";
import { Readable } from "stream";

export const createStreamHandler = (responseStream: Readable) => {
  let audioBuffer = new Uint8Array();
  const requestId = randomUUID().substring(0, 8);
  let resolve, reject;
  const result = new Promise<Uint8Array | null>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const push = (audioData: Uint8Array) => {
    responseStream.push(audioData);
    const newData = new Uint8Array(audioBuffer.length + audioData.length);
    newData.set(audioBuffer, 0);
    newData.set(audioData, audioBuffer.length);
    audioBuffer = newData;
  };

  const end = () => {
    console.log(requestId, "✅ Done: ", audioBuffer.length);
    responseStream.push(null);

    resolve(audioBuffer.length < 1000 ? null : audioBuffer);
  };

  const error = (err: any, msg = "Something went wrong") => {
    console.log(requestId, "❌ " + msg, err);
    responseStream.push("404");
    responseStream.push(null);
    reject();
  };

  return { requestId, result, push, end, error };
};
