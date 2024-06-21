import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req, { params }) {
  try {
    const { orderId } = params;
    const { status } = await req.json();

    const order = await db.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return new NextResponse("Order not found");
    }

    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json(
      {
        data: null,
        success: true,
        message: "Order delivered",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
