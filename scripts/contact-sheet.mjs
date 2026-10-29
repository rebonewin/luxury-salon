import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const outDir = "C:/Users/HP/AppData/Local/Temp/opencode/salon-candidates";
await fs.mkdir(outDir, { recursive: true });

const ids = [
  // salon interiors
  "photo-1560066984-138dadb4c035",
  "photo-1521590832167-7bcbfaa6381f",
  "photo-1633681926022-84c23e8cb2d6",
  "photo-1600607687939-ce8a6c25118c",
  "photo-1618221195710-dd6b41faaea6",
  "photo-1600210492486-724fe5c67fb0",
  "photo-1616486338812-3dadae4b4ace",
  "photo-1600566753190-17f0baa2a6c3",
  // hair
  "photo-1522337360788-8b13dee7a37e",
  "photo-1562322140-8baeececf3df",
  "photo-1595476108010-b4d1f102b1b1",
  "photo-1580618672591-eb180b1a973f",
  "photo-1605497788044-5a32c7078486",
  "photo-1516975080664-ed2fc6a32937",
  "photo-1527799820374-dcf8d9d4a388",
  "photo-1522338242992-e1a54906a8da",
  // beauty / skin
  "photo-1570172619644-dfd03ed5d881",
  "photo-1519014816548-bf5fe059798b",
  "photo-1540555700478-4be289fbecef",
  "photo-1515377905703-c4788e51af15",
  "photo-1596178065887-1198b6148b2b",
  "photo-1616394584738-fc6e612e71b9",
  "photo-1556228720-195a672e8a03",
  "photo-1598440947619-2c35fc9aa908",
  // makeup
  "photo-1487412947147-5cebf100ffc2",
  "photo-1526045478516-99145907023c",
  "photo-1596462502278-27bfdc403348",
  "photo-1512496015851-a90fb38ba796",
  "photo-1522335789203-aabd1fc54bc9",
  "photo-1588516903720-8ceb67f9ef84",
  // portraits
  "photo-1524504388940-b1c1722653e1",
  "photo-1534528741775-53994a69daeb",
  "photo-1508214751196-bcfd4ca60f91",
  "photo-1488426862026-3ee34a7d66df",
  "photo-1492106087820-71f1a00d2b11",
  "photo-1519699047748-de8e457a634e",
  "photo-1544005313-94ddf0286df2",
  "photo-1531746020798-e6953c6e8e04",
  // bridal / wedding
  "photo-1594736797933-d0501ba2fe65",
  "photo-1523438885200-e635ba2c371e",
  "photo-1544078751-58fee2d8a03b",
  "photo-1606800052052-a08af7148866",
  "photo-1591604466107-ec97de577aff",
  "photo-1583939003579-730e3918a45a",
  "photo-1537633552985-df8429e8048b",
  "photo-1519225421980-715cb0215aed",
];

const W = 500;
const H = 640;
const COLS = 6;
const LABEL = 34;
const results = [];

async function download(id, i) {
  const url = `https://images.unsplash.com/${id}?w=${W}&h=${H}&fit=crop&q=72&auto=format`;
  const file = path.join(outDir, `${String(i).padStart(2, "0")}-${id}.jpg`);
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(String(res.status));
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(file, buf);
    return { id, file, ok: true, bytes: buf.length };
  } catch (e) {
    return { id, ok: false, error: String(e) };
  }
}

const jobs = ids.map((id, i) => download(id, i));
const settled = await Promise.all(jobs);
settled.forEach((r, i) => results.push({ ...r, index: i }));

const ok = results.filter((r) => r.ok);
const rows = Math.ceil(ok.length / COLS);
const sheetW = COLS * W;
const sheetH = rows * (H + LABEL);
const composites = [];

for (let i = 0; i < ok.length; i++) {
  const r = ok[i];
  const left = (i % COLS) * W;
  const top = Math.floor(i / COLS) * (H + LABEL);
  const img = await sharp(r.file).resize(W, H, { fit: "cover" }).toBuffer();
  composites.push({ input: img, left, top });
  const label = Buffer.from(
    `<svg width="${W}" height="${LABEL}"><rect width="100%" height="100%" fill="#111"/><text x="12" y="23" font-family="Arial" font-size="17" fill="#fff">#${String(i).padStart(2, "0")}  ${r.id.replace("photo-", "")}</text></svg>`
  );
  composites.push({ input: label, left, top: top + H });
}

await sharp({
  create: { width: sheetW, height: sheetH, channels: 3, background: "#111" },
})
  .composite(composites)
  .jpeg({ quality: 78 })
  .toFile(path.join(outDir, "contact-sheet.jpg"));

const index = ok.map((r, i) => `#${String(i).padStart(2, "0")}  ${r.id}`).join("\n");
await fs.writeFile(path.join(outDir, "index.txt"), index);
console.log(`Downloaded ${ok.length}/${ids.length}`);
console.log(index);
console.log(settled.filter((r) => !r.ok));
