import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      data: products,
    });
  } catch (err) {
    console.log(err);

    // if (err instanceof JsonWebTokenError) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // } else {
    return new NextResponse("Internal Server Error", { status: 500 });
    // }
  }
}

export async function POST(req) {
  try {
    const {
      title,
      price,
      description,
      category_id,
      company,
      shipping,
      stock,
      colors,
      images,
    } = await req.json();

    const category = await db.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Create products
    const product = await db.product.create({
      data: {
        company,
        price,
        title,
        description,
        category_id,
        shipping,
        stock,
        colors,
        images,
      },
    });

    return NextResponse.json({
      data: product,
      success: true,
      message: "Product created successfully",
    });
  } catch (err) {
    console.log(err);
    // if (err instanceof JsonWebTokenError) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // } else {
    return new NextResponse("Internal Server Error", { status: 500 });
    // }
  }
}
