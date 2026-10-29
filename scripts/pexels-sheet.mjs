import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const outDir = "C:/Users/HP/AppData/Local/Temp/opencode/pexels-candidates";
await fs.mkdir(outDir, { recursive: true });

const ids = [
  // salon interiors
  31323301, 7750122, 7750115, 7750108, 7750130, 7750117, 27165067, 13068359,
  3736396, 3993308, 3993122, 19664872, 35844834, 13068377,
  // bridal / Indian bridal
  33754388, 30825617, 11742214, 20695691, 29516468, 29516472, 34037599, 34037603,
  15789321, 10429557, 14062394, 36102603, 6419479, 9772228, 38796471, 17125530,
  // hair / styling
  3993449, 3992874, 3993310, 3993429, 3736520, 3993139, 3065171, 1319460,
  1813272, 2065195, 2681751, 3992870, 3993135, 3993175, 1848565, 3993320,
  // makeup
  2533266, 3373746, 2693645, 2113855, 1115127, 1380927, 2253835, 3757942,
  2536965, 3065173, 1760906, 2058278, 3993444, 3993445,
  // facial / skincare / spa
  3985333, 3985338, 3985325, 6663374, 6663369, 6663382, 6663574, 7446671,
  3764570, 3985349, 5069611, 3762879, 3757954, 4473864, 3785147, 4765422,
  // portraits / editorial
  1858175, 1130626, 415829, 774909, 1239291, 733872, 1036623, 3763152,
  1462637, 247204, 1382731,
];

const W = 420;
const H = 540;
const COLS = 7;
const LABEL = 32;
const jobs = ids.map(async (id, i) => {
  const file = path.join(outDir, `${String(i).padStart(2, "0")}-${id}.jpg`);
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${W * 2}&h=${H * 2}&fit=crop`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(String(res.status));
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(file, buf);
    const meta = await sharp(buf).metadata();
    return { id, i, file, ok: true, w: meta.width, h: meta.height };
  } catch (e) {
    return { id, i, ok: false, error: String(e) };
  }
});
const results = await Promise.all(jobs);
const ok = results.filter((r) => r.ok);
const rows = Math.ceil(ok.length / COLS);
const composites = [];
for (let i = 0; i < ok.length; i++) {
  const r = ok[i];
  const left = (i % COLS) * W;
  const top = Math.floor(i / COLS) * (H + LABEL);
  const img = await sharp(r.file).resize(W, H, { fit: "cover" }).toBuffer();
  composites.push({ input: img, left, top });
  const label = Buffer.from(
    `<svg width="${W}" height="${LABEL}"><rect width="100%" height="100%" fill="#111"/><text x="10" y="22" font-family="Arial" font-size="15" fill="#fff">${String(i).padStart(2, "0")} · ${r.id}</text></svg>`
  );
  composites.push({ input: label, left, top: top + H });
}
await sharp({
  create: { width: COLS * W, height: rows * (H + LABEL), channels: 3, background: "#111" },
})
  .composite(composites)
  .jpeg({ quality: 80 })
  .toFile(path.join(outDir, "contact-sheet.jpg"));
console.log(`Downloaded ${ok.length}/${ids.length}`);
console.log(ok.map((r, i) => `${String(i).padStart(2, "0")} · ${r.id}`).join("\n"));
console.log("FAILED", results.filter((r) => !r.ok));
