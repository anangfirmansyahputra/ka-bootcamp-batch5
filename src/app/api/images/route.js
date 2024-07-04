import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const formData = await req.formData();
  const files = formData.getAll("files");

  if (!files) {
    return new NextResponse("No files received.", { status: 400 });
  }

  try {
    let images = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + file.name.replaceAll(" ", "_");

      // Simpan file sebagai blob di database menggunakan Prisma
      const savedFile = await db.file.create({
        data: {
          filename: filename,
          fileblob: buffer,
        },
      });

      images.push(savedFile.filename);
    }

    return NextResponse.json({
      data: images,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
