import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = "C:/Users/HP/luxury-salon";
const sources = {
  exterior: "C:/Users/HP/Downloads/149189.jpg",
  chairs: "C:/Users/HP/Downloads/149190.jpg",
  street: "C:/Users/HP/Downloads/149191.jpg",
};

await fs.mkdir(path.join(root, "assets/salon"), { recursive: true });
for (const [name, source] of Object.entries(sources)) {
  const extension = path.extname(source);
  await fs.copyFile(source, path.join(root, "assets/salon", `${name}${extension}`));
}

const grade = (image) =>
  image
    .modulate({ saturation: 0.86, brightness: 0.95 })
    .linear(1.035, -4)
    .recomb([
      [1.045, 0.01, 0.0],
      [0.01, 1.0, 0.0],
      [0.0, 0.01, 0.945],
    ]);

async function write(name, source, build) {
  const out = path.join(root, "public/images", name);
  let image = sharp(source).rotate();
  image = build(image);
  await grade(image).webp({ quality: 84, effort: 5 }).toFile(out);
  const meta = await sharp(out).metadata();
  const blur = await sharp(out)
    .resize(24)
    .blur(1.2)
    .webp({ quality: 35 })
    .toBuffer();
  console.log(`${name.padEnd(34)} ${meta.width}x${meta.height} ${((await fs.stat(out)).size / 1024).toFixed(0)} KB`);
  return {
    src: `/images/${name}`,
    width: meta.width,
    height: meta.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}

const manifestPath = path.join(root, "src/lib/image-manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

manifest.salonFloor = await write("salon/salon-floor.webp", sources.chairs, (image) =>
  image.extract({ left: 0, top: 80, width: 1200, height: 1500 }),
);

manifest.salonWide = await write("salon/salon-wide.webp", sources.chairs, (image) =>
  image.extract({ left: 0, top: 470, width: 1200, height: 600 }).resize(1800, 900),
);

manifest.salonEntrance = await write("salon/salon-entrance.webp", sources.exterior, (image) =>
  image.extract({ left: 820, top: 110, width: 780, height: 780 }).resize(1200, 1200),
);

manifest.atelier = await write("gallery/08-atelier.webp", sources.chairs, (image) =>
  image.resize(1200, 1800, { fit: "cover", position: "attention" }),
);

manifest["space-gallery"] = await write("gallery/12-space.webp", sources.street, (image) =>
  image.extract({ left: 0, top: 620, width: 1200, height: 675 }).resize(1600, 900),
);

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

// Contact sheet for review.
const thumbs = [
  ["Floor (home about)", "public/images/salon/salon-floor.webp"],
  ["Wide (about / contact)", "public/images/salon/salon-wide.webp"],
  ["Entrance", "public/images/salon/salon-entrance.webp"],
  ["Gallery atelier", "public/images/gallery/08-atelier.webp"],
  ["Gallery room", "public/images/gallery/12-space.webp"],
];
const tiles = [];
let x = 0;
for (const [label, relative] of thumbs) {
  const tile = await sharp(path.join(root, relative))
    .resize(360, 360, { fit: "cover" })
    .toBuffer();
  tiles.push({ label, input: tile, left: x, top: 0 });
  x += 380;
}
const labels = Buffer.from(
  `<svg width="${x}" height="420" xmlns="http://www.w3.org/2000/svg">
    <rect width="${x}" height="420" fill="#f2ebdf"/>
    ${tiles
      .map(
        (tile) =>
          `<text x="${tile.left + 12}" y="398" font-family="Arial" font-size="18" fill="#0b0a08">${tile.label}</text>`,
      )
      .join("")}
  </svg>`,
);
await sharp({
  create: { width: x, height: 420, channels: 3, background: "#f2ebdf" },
})
  .composite([...tiles, { input: labels, left: 0, top: 0 }])
  .jpeg({ quality: 88 })
  .toFile(path.join(root, "assets/real-photos-contact-sheet.jpg"));

// New Open Graph image using the real interior.
const ogBase = await sharp(path.join(root, "public/images/salon/salon-wide.webp"))
  .resize(1200, 630, { fit: "cover" })
  .toBuffer();
const overlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0b0a08" stop-opacity="0.92"/>
      <stop offset="0.58" stop-color="#0b0a08" stop-opacity="0.62"/>
      <stop offset="1" stop-color="#0b0a08" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="150" font-family="Georgia, serif" font-size="24" letter-spacing="8" fill="#d7bb90">LUXURY SALON</text>
  <text x="72" y="184" font-family="Arial, sans-serif" font-size="13" letter-spacing="6" fill="#f2ebdf" opacity="0.7">THE BEAUTY ATELIER</text>
  <text x="72" y="310" font-family="Georgia, serif" font-size="74" fill="#faf7f1">Beauty, style</text>
  <text x="72" y="392" font-family="Georgia, serif" font-size="74" font-style="italic" fill="#faf7f1">and confidence.</text>
  <text x="72" y="490" font-family="Arial, sans-serif" font-size="18" letter-spacing="4" fill="#d8cfc0">MASURI · MEERUT · UTTAR PRADESH</text>
  <line x1="72" y1="522" x2="250" y2="522" stroke="#ad8752" stroke-width="1"/>
  <text x="72" y="565" font-family="Arial, sans-serif" font-size="20" letter-spacing="2" fill="#faf7f1">+91 99176 54510</text>
</svg>`);
await sharp(ogBase)
  .composite([{ input: overlay, left: 0, top: 0 }])
  .jpeg({ quality: 88 })
  .toFile(path.join(root, "public/images/og-image.jpg"));

console.log("Manifest updated and OG image rebuilt.");
