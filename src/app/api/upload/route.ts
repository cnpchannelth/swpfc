import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const ext = file.name.includes(".")
      ? "." + file.name.split(".").pop()!.toLowerCase()
      : ".jpg";
    const base = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 60);
    const filename = `${Date.now()}_${base}${ext}`;

    const { env } = getRequestContext();
    const r2 = (env as unknown as { R2: R2Bucket }).R2;

    const buffer = await file.arrayBuffer();
    await r2.put(filename, buffer, {
      httpMetadata: {
        contentType: file.type || "image/jpeg",
        cacheControl: "public, max-age=31536000, immutable",
      },
    });

    return NextResponse.json({ url: `/api/uploads/${filename}` });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
