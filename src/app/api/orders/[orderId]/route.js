import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

// Get order by id and include order_items in order and include product in order_items
export async function GET(req, { params }) {
  try {
    //
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Token not provided", {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    // Tangkap params orderId
    const { orderId } = params;

    // Ambil order
    const order = await db.order.findFirst({
      where:
        user.role === "ADMIN"
          ? {
              id: orderId,
            }
          : {
              id: orderId,
              user_id: decoded.id,
            },
      include: {
        order_items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Cek apakah order ada
    if (!order) {
      return new NextResponse("Order not found", {
        status: 404,
      });
    }

    return NextResponse.json({
      data: order,
      message: "Order found",
      success: true,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Token Invalid", {
        status: 401,
      });
    } else {
      return new NextResponse("Internal Server Error", {
        status: 500,
      });
    }
  }
}

// Delete order by id
export async function DELETE(req, { params }) {
  try {
    //
    const token = req.headers.get("authorization");

    if (!token) {
      return new NextResponse("Token not provided", {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    // Tangkap params orderId
    const { orderId } = params;

    // Ambil order
    const order = await db.order.findFirst({
      where:
        user.role === "ADMIN"
          ? {
              id: orderId,
            }
          : {
              id: orderId,
              user_id: decoded.id,
            },
    });

    // Cek apakah order ada
    if (!order) {
      return new NextResponse("Order not found", {
        status: 404,
      });
    }

    await db.order.delete({
      where:
        user.role === "ADMIN"
          ? {
              id: orderId,
            }
          : {
              id: orderId,
              user_id: decoded.id,
            },
    });

    return NextResponse.json({
      data: null,
      message: "Delete order success",
      success: true,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof JsonWebTokenError) {
      return new NextResponse("Token Invalid", {
        status: 401,
      });
    } else {
      return new NextResponse("Internal Server Error", {
        status: 500,
      });
    }
  }
}
