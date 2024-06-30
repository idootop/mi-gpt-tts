import { kTTSSpeakers } from "@/src";

export default async function handler(request, response) {
  response.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(kTTSSpeakers));
}
