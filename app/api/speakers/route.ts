import { kTTSSpeakers } from "@/app/tts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json(kTTSSpeakers);
}
