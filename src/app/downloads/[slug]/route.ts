import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { findDownloadBySlug } from "../data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = findDownloadBySlug(slug);
  if (!entry) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "downloads", entry.fileName);
  let fileBuffer: Buffer;
  try {
    fileBuffer = await readFile(filePath);
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }

  const downloadName = entry.downloadName ?? entry.fileName;
  const encodedName = encodeURIComponent(downloadName);

  const body = new Uint8Array(fileBuffer);
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodedName}`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
