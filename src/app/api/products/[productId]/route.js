import { unlink } from "fs/promises";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import path from "path";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET(req, { params }) {
  try {
    const product = await db.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return NextResponse.json({
      data: product,
      success: true,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}

export async function PATCH(req, { params }) {
  try {
    const { productId } = params;

    const product = await db.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

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

    const updateProduct = await db.product.update({
      where: {
        id: productId,
      },
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
      data: updateProduct,
      success: true,
      message: "Update product success",
    });
  } catch (err) {
    // console.log(err);
    // if (err instanceof JsonWebTokenError) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // } else {
    return new NextResponse("Internal Server Error", { status: 500 });
    // }
  }
}

export async function DELETE(req, { params }) {
  try {
    const { productId } = params;

    const product = await db.product.findFirst({
      where: {
        id: params.productId,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // product.images.forEach(async (image) => {
    //   await unlink(path.join(process.cwd(), "public/uploads/" + image));
    // });

    await db.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({
      data: null,
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log(err);
    // if (err instanceof JsonWebTokenError) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // } else if (err instanceof PrismaClientKnownRequestError) {
    //   return new NextResponse(
    //     "This product cannot be deleted because there are order associated with it. Please delete the associated order first before deleting the product.",
    //     { status: 400 },
    //   );
    // } else {
    return new NextResponse("Internal Server Error", { status: 500 });
    // }
  }
}
