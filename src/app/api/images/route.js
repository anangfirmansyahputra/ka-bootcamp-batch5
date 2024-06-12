import { writeFile } from "fs/promises";
import path from "path";
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
      await writeFile(
        path.join(process.cwd(), "public/uploads/" + filename),
        buffer,
      );

      images.push(filename);
    }
    return NextResponse.json({
      data: images,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
