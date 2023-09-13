import { NextRequest, NextResponse } from "next/server";

async function sleep() {
  return new Promise((resolve) => {
    return setTimeout(resolve, Math.random() * 4000);
  });
}

export async function POST(req: NextRequest) {
  try {
    await sleep();
    return NextResponse.json({
      message: "hello",
    });
  } catch (e) {}
}
