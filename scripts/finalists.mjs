import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const outDir = "C:/Users/HP/AppData/Local/Temp/opencode/pexels-finalists";
await fs.mkdir(outDir, { recursive: true });
const W = 520, H = 650, COLS = 4, LABEL = 30;
const ids = [20695691, 33754388, 3356170, 18186525, 2799605, 33945853, 3993323, 8468125, 3993445, 3993453, 4473864, 2693645];
const composites = [];
let i = 0;
for (const id of ids) {
  const file = path.join(outDir, `${id}.jpg`);
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) { console.log("FAIL", id, res.status); continue; }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(file, buf);
  const meta = await sharp(buf).metadata();
  const img = await sharp(buf).resize(W, H, { fit: "cover" }).toBuffer();
  const left = (i % COLS) * W;
  const top = Math.floor(i / COLS) * (H + LABEL);
  composites.push({ input: img, left, top });
  composites.push({
    input: Buffer.from(`<svg width="${W}" height="${LABEL}"><rect width="100%" height="100%" fill="#111"/><text x="10" y="21" font-family="Arial" font-size="15" fill="#fff">${id} · ${meta.width}x${meta.height}</text></svg>`),
    left, top: top + H,
  });
  i++;
}
await sharp({ create: { width: COLS * W, height: Math.ceil(ids.length / COLS) * (H + LABEL), channels: 3, background: "#111" } })
  .composite(composites).jpeg({ quality: 86 }).toFile(path.join(outDir, "sheet.jpg"));
console.log("done", i);
