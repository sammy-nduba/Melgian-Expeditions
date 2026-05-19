import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded." },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a sanitized unique filename
    const sanitizedFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const toursDir = join(process.cwd(), "public", "images", "tours");

    // Ensure the tours directory exists
    await mkdir(toursDir, { recursive: true });

    // Write file to local disk
    const filePath = join(toursDir, sanitizedFilename);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/images/tours/${sanitizedFilename}`,
    });
  } catch (error) {
    console.error("Local Next.js image upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to upload image.",
      },
      { status: 500 }
    );
  }
}
