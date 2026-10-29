import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = "C:/Users/HP/luxury-salon";
const jobs = [
  ["services/makeup.webp", 37083518, 1200, 1500],
  ["salon/contact-studio.webp", 7750122, 1200, 1500],
  ["gallery/08-atelier.webp", 7750122, 1600, null],
];
const manifestPath = path.join(root, "src/lib/image-manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const keys = { "services/makeup.webp": "makeup", "salon/contact-studio.webp": "studio", "gallery/08-atelier.webp": "atelier" };
for (const [dest, id, w, h] of jobs) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w * 2}`;
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) { console.log("FAIL", dest, res.status); continue; }
  let img = sharp(Buffer.from(await res.arrayBuffer()));
  img = h
    ? img.resize({ width: w, height: h, fit: "cover", position: "attention" })
    : img.resize({ width: w, height: null });
  const out = path.join(root, "public/images", dest);
  await img.webp({ quality: 82, effort: 5 }).toFile(out);
  const meta = await sharp(out).metadata();
  const blur = await sharp(out).resize(24).blur(1.2).webp({ quality: 35 }).toBuffer();
  manifest[keys[dest]] = {
    src: `/images/${dest}`,
    width: meta.width,
    height: meta.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  console.log(`${dest} ${meta.width}x${meta.height} ${((await fs.stat(out)).size / 1024).toFixed(0)}KB`);
}
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
