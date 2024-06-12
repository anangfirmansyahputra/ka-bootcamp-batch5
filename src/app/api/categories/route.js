import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

export async function POST(request) {
  try {
    const token = await request.headers.get("authorization");

    if (!token) {
      return new NextResponse("Token not provided", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    // Tangkap nilai di body
    const body = await request.json();

    // Insert new data to categories
    const category = await db.category.create({
      data: {
        name: body.name,
      },
    });

    // Return to client
    return NextResponse.json(
      {
        data: category,
        success: true,
        message: "Category created",
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", {
        status: 500,
      });
    }
  }
}

export async function GET(request) {
  try {
    // Get all categories
    const categories = await db.category.findMany();
    console.log(categories);

    return NextResponse.json({
      data: categories,
      success: true,
      message: "Get all categories",
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
