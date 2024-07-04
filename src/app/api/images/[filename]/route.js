import { unlink } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { db } from "@/lib/db";

export const DELETE = async (req, { params }) => {
  try {
    await unlink(path.join(process.cwd(), "public/uploads/" + params.filename));
    return new NextResponse("File deleted successfully.", { status: 200 });
  } catch (error) {
    console.error("Error occurred while deleting file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    const file = await db.file.findFirst({
      where: {
        filename: params.filename,
      },
    });

    if (!file) {
      return new NextResponse("File not found", { status: 404 });
    }

    const buffer = Buffer.from(file.fileblob);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg", // Atur sesuai dengan tipe MIME file gambar kamu
        "Content-Length": buffer.length,
      },
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
