import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const safe = filename.replace(/[/\\]/g, "");

  try {
    const { env } = getCloudflareContext();
    const r2 = (env as unknown as { R2: R2Bucket }).R2;

    const object = await r2.get(safe);

    if (!object) {
      return new NextResponse("Not found", { status: 404 });
    }

    const ext = safe.split(".").pop()?.toLowerCase() ?? "";
    const contentType =
      object.httpMetadata?.contentType ||
      (ext === "png"  ? "image/png"  :
       ext === "webp" ? "image/webp" :
       ext === "gif"  ? "image/gif"  :
                        "image/jpeg");

    const buffer = await object.arrayBuffer();
    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(buffer, { headers });
  } catch (err) {
    console.error("Serve error:", err);
    return new NextResponse("Error", { status: 500 });
  }
}
