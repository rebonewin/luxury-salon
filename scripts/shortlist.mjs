import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const srcDir = "C:/Users/HP/AppData/Local/Temp/opencode/pexels-candidates";
const outDir = "C:/Users/HP/AppData/Local/Temp/opencode/pexels-shortlist";
await fs.mkdir(outDir, { recursive: true });

const ids = [
  [33754388, "hero-a"], [20695691, "hero-b"], [30825617, "hero-c"], [36102603, "hero-d"],
  [27165067, "interior-a"], [13068359, "interior-b"], [7750108, "interior-c"], [7750115, "interior-d"],
  [3065171, "hair-a"], [2536965, "hair-b"], [3993310, "hair-c"], [3993320, "hair-d"],
  [3993444, "makeup-a"], [3993445, "makeup-b"], [3373746, "detail-a"], [2693645, "detail-b"],
  [3985338, "facial-a"], [6663369, "facial-b"], [6663574, "facial-c"], [3757954, "facial-d"],
  [29516468, "bridal-a"], [10429557, "bridal-b"], [6419479, "bridal-c"], [17125530, "bridal-d"],
];
const W = 460, H = 600, COLS = 6, LABEL = 30;
const files = [];
for (const dir of ["", srcDir]) {
  try { files.push(...(await fs.readdir(dir))); } catch {}
}
const composites = [];
let i = 0;
for (const [id, label] of ids) {
  const match = (await fs.readdir(srcDir)).find((f) => f.includes(`-${id}.jpg`));
  if (!match) { console.log("MISSING", id); continue; }
  const img = await sharp(path.join(srcDir, match)).resize(W, H, { fit: "cover" }).toBuffer();
  const left = (i % COLS) * W;
  const top = Math.floor(i / COLS) * (H + LABEL);
  composites.push({ input: img, left, top });
  composites.push({
    input: Buffer.from(
      `<svg width="${W}" height="${LABEL}"><rect width="100%" height="100%" fill="#111"/><text x="10" y="21" font-family="Arial" font-size="16" fill="#fff">${label} · ${id}</text></svg>`
    ),
    left, top: top + H,
  });
  i++;
}
await sharp({
  create: { width: COLS * W, height: Math.ceil(ids.length / COLS) * (H + LABEL), channels: 3, background: "#111" },
})
  .composite(composites)
  .jpeg({ quality: 84 })
  .toFile(path.join(outDir, "shortlist.jpg"));
console.log("done", i);
