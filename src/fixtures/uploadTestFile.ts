import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

function bufferForExtension(extension: string): Buffer {
  switch (extension) {
    case ".png":
      // Minimal valid PNG (1x1 px)
      return Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00,
        0x0d, 0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00,
        0x00, 0x01, 0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde,
        0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x63,
        0xf8, 0xcf, 0xc0, 0x00, 0x00, 0x00, 0x03, 0x00, 0x01, 0x4b, 0xe5,
        0x27, 0xde, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
        0x42, 0x60, 0x82,
      ]);
    case ".jpg":
    case ".jpeg":
      // Minimal JPEG (SOI + EOI). Many upload validators accept this.
      return Buffer.from([0xff, 0xd8, 0xff, 0xd9]);
    case ".pdf":
      // Minimal PDF
      return Buffer.from("%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n");
    default:
      throw new Error(
        `Unsupported mock file extension: ${extension}. Use .png, .jpg, or .pdf.`,
      );
  }
}

export async function createTempUploadFile(originalName: string): Promise<string> {
  const ext = path.extname(originalName || "").toLowerCase() || ".png";
  const baseName = path.basename(originalName || `mock${ext}`);
  const fileName = `${Date.now()}-${baseName}`;
  const filePath = path.join(os.tmpdir(), fileName);

  await fs.writeFile(filePath, bufferForExtension(ext));
  return filePath;
}

