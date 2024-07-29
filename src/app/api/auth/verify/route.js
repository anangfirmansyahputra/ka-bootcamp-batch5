import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const token = await request.headers.get("authorization");

    if (!token) {
      return new NextResponse("Token not provided", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      },
    );
  }
}
