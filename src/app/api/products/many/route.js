import { db } from "@/lib/db";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);

    const processedData = json.map((item) => {
      const images = [];
      const colors = [];
      for (const key in item) {
        if (key.startsWith("Image")) {
          images.push(item[key]);
          delete item[key];
        }

        if (key.startsWith("Color")) {
          colors.push(item[key]);
          delete item[key];
        }
      }

      if (images.length > 0) {
        item.images = images;
      }

      if (colors.length > 0) {
        item.colors = colors;
      }

      return item;
    });

    const transactions = await db.$transaction(async (ctx) => {
      try {
        let products = [];
        for (const data of processedData) {
          console.log(data);

          const category = await ctx.category.findFirst({
            where: {
              name: data.Category,
            },
          });

          if (!category) {
            const error = new Error("Category not found");
            error.status = 404;
          }

          const product = await ctx.product.create({
            data: {
              title: data.Title,
              price: data.Price,
              description: data.Description,
              category_id: category.id,
              company: data.Company,
              stock: data.Stock,
              shipping: data.Shipping === "Yes" ? true : false,
              colors: data.colors,
              images: data.images,
            },
          });

          products.push(product);
        }

        return products;
      } catch (err) {
        console.log(err);
        const error = new Error("Add product failed");
        error.status = 400;
        throw error;
      }
    });

    return NextResponse.json(
      {
        data: transactions,
        success: true,
        message: "Create product successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    if (err instanceof PrismaClientValidationError) {
      return new NextResponse("Data from excel is invalid", { status: 400 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}

export async function PATCH(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);

    const processedData = json.map((item) => {
      const images = [];
      const colors = [];
      for (const key in item) {
        if (key.startsWith("Image")) {
          images.push(item[key]);
          delete item[key];
        }

        if (key.startsWith("Color")) {
          colors.push(item[key]);
          delete item[key];
        }
      }

      if (images.length > 0) {
        item.images = images;
      }

      if (colors.length > 0) {
        item.colors = colors;
      }

      return item;
    });

    const transactions = await db.$transaction(async (ctx) => {
      try {
        let products = [];
        for (const data of processedData) {
          console.log(data);

          const category = await ctx.category.findFirst({
            where: {
              name: data.Category,
            },
          });

          if (!category) {
            const error = new Error("Category not found");
            error.status = 404;
          }

          const product = await ctx.product.update({
            where: {
              id: data.Id,
            },
            data: {
              title: data.Title,
              price: data.Price,
              description: data.Description,
              category_id: category.id,
              company: data.Company,
              stock: data.Stock,
              shipping: data.Shipping === "Yes" ? true : false,
              colors: data.colors,
              images: data.images,
            },
          });

          products.push(product);
        }

        return products;
      } catch (err) {
        console.log(err);
        const error = new Error("Add product failed");
        error.status = 400;
        throw error;
      }
    });

    return NextResponse.json(
      {
        data: transactions,
        success: true,
        message: "Updated product successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    if (err instanceof PrismaClientValidationError) {
      return new NextResponse("Data from excel is invalid", { status: 400 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}
