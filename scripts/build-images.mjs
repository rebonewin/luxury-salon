import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

// One-off Pexels import from the initial build. It overwrites every image,
// including the real salon photography, so use import-real-photos.mjs for the
// current assets and only run this script for a full placeholder refresh.

const root = "C:/Users/HP/luxury-salon";
const dirs = ["salon", "services", "gallery"].map((d) => path.join(root, "public/images", d));
await Promise.all(dirs.map((d) => fs.mkdir(d, { recursive: true })));

const jobs = [
  // path, pexels id, target width, target height (null = preserve)
  ["salon/hero.webp", 20695691, 2400, 1600, "hero"],
  ["salon/about-space.webp", 27165067, 1200, 1500, "space"],
  ["salon/about-portrait.webp", 33754388, 1200, 1600, "portrait"],
  ["salon/contact-studio.webp", 13068359, 1200, 1500, "studio"],
  ["services/hair-cut.webp", 3993453, 1200, 1500, "cut"],
  ["services/hair-styling.webp", 3065171, 1200, 1500, "styling"],
  ["services/hair-color.webp", 8468125, 1200, 1500, "color"],
  ["services/hair-treatment.webp", 3993444, 1200, 1500, "treatment"],
  ["services/facial.webp", 6663369, 1200, 1500, "facial"],
  ["services/makeup.webp", 33945853, 1200, 1500, "makeup"],
  ["services/skin-care.webp", 6663574, 1200, 1500, "skin"],
  ["services/bridal-makeup.webp", 30825617, 1200, 1500, "bridal-makeup"],
  ["services/wedding-packages.webp", 36102603, 1200, 1500, "wedding"],
  ["gallery/01-veil.webp", 10429557, 1400, null, "veil"],
  ["gallery/02-profile.webp", 6419479, 1400, null, "profile"],
  ["gallery/03-radiance.webp", 33754388, 1400, null, "radiance"],
  ["gallery/04-celebration.webp", 36102603, 1400, null, "celebration"],
  ["gallery/05-golden.webp", 17125530, 1400, null, "golden"],
  ["gallery/06-ritual.webp", 3993444, 1600, null, "ritual"],
  ["gallery/07-colour.webp", 3993323, 1400, null, "colour"],
  ["gallery/08-atelier.webp", 13068359, 1600, null, "atelier"],
  ["gallery/09-waves.webp", 3065171, 1400, null, "waves"],
  ["gallery/10-detail.webp", 30825617, 1400, null, "detail"],
  ["gallery/11-scissors.webp", 3993453, 1400, null, "scissors"],
  ["gallery/12-space.webp", 27165067, 1600, null, "space-gallery"],
];

const manifest = {};
for (const [dest, id, w, h, key] of jobs) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${Math.max(w, h ?? 0) * 2 || 2400}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let img = sharp(Buffer.from(await res.arrayBuffer()));
    if (h) {
      img = img.resize({ width: w, height: h, fit: "cover", position: "attention" });
    } else {
      img = img.resize({ width: w, height: null, withoutEnlargement: false });
    }
    const out = path.join(root, "public/images", dest);
    await img.webp({ quality: 82, effort: 5 }).toFile(out);
    const savedMeta = await sharp(out).metadata();
    const blur = await sharp(out).resize(24).blur(1.2).webp({ quality: 35 }).toBuffer();
    manifest[key] = {
      src: `/images/${dest}`,
      width: savedMeta.width,
      height: savedMeta.height,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    };
    const size = (await fs.stat(out)).size;
    console.log(`${dest.padEnd(38)} ${savedMeta.width}x${savedMeta.height} ${(size / 1024).toFixed(0)} KB`);
  } catch (e) {
    console.log("FAIL", dest, e.message);
  }
}

await fs.writeFile(path.join(root, "src/lib/image-manifest.json"), JSON.stringify(manifest, null, 2));

// Open Graph image
const heroBuf = await sharp(path.join(root, "public/images/salon/hero.webp"))
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .toBuffer();
const overlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0b0a08" stop-opacity="0.88"/>
      <stop offset="0.55" stop-color="#0b0a08" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#0b0a08" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="170" font-family="Georgia, serif" font-size="26" letter-spacing="8" fill="#c9a86f">LUXURY SALON</text>
  <text x="72" y="295" font-family="Georgia, serif" font-size="72" fill="#f7f2e9">Beauty, style</text>
  <text x="72" y="375" font-family="Georgia, serif" font-size="72" font-style="italic" fill="#f7f2e9">and confidence.</text>
  <text x="72" y="480" font-family="Arial, sans-serif" font-size="22" letter-spacing="4" fill="#d8cfc0">LUXURY SALON · MASURI, MEERUT</text>
  <line x1="72" y1="520" x2="260" y2="520" stroke="#c9a86f" stroke-width="1"/>
  <text x="72" y="565" font-family="Arial, sans-serif" font-size="20" letter-spacing="2" fill="#f7f2e9">9917654510</text>
</svg>`);
await sharp(heroBuf)
  .composite([{ input: overlay, left: 0, top: 0 }])
  .jpeg({ quality: 88 })
  .toFile(path.join(root, "public/images/og-image.jpg"));
console.log("OG image created");
