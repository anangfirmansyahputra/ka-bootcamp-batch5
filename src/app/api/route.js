import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({
    title: "Bootcamp Backednd API",
    message: "Hello World!",
  });
}
