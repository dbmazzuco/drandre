/**
 * Gera as imagens otimizadas da landing page a partir dos arquivos oficiais em /brand-assets.
 *
 * Uso: npm run images
 *
 * Para trocar a fotografia ou o logotipo, substitua o arquivo correspondente em /brand-assets
 * (mantendo o nome) e rode o comando novamente. Os arquivos gerados vão para /public/images.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "brand-assets";
const OUT = "public/images";
const IVORY = "#F7F5F1";
const GRAPHITE = "#252525";

await mkdir(OUT, { recursive: true });

/** Fotografia do médico: versões responsivas em AVIF, WebP e JPEG (fallback). */
async function doctorPhoto() {
  const input = `${SRC}/dr-andre-menegat.jpg`;
  const { width } = await sharp(input).metadata();
  const widths = [480, 640, width].filter((w, i, all) => w <= width && all.indexOf(w) === i);

  for (const w of widths) {
    const base = sharp(input).resize({ width: w });
    await base.clone().avif({ quality: 55 }).toFile(`${OUT}/dr-andre-menegat-${w}.avif`);
    await base.clone().webp({ quality: 80 }).toFile(`${OUT}/dr-andre-menegat-${w}.webp`);
  }
  await sharp(input).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/dr-andre-menegat.jpg`);
  console.log("foto:", widths.join(", "));
}

/** Logotipos (já com fundo transparente): versão completa e monograma "AM" recortado. */
async function logos() {
  const variants = [
    ["logo-dourado.webp", "logo-dourado"],
    ["logo-champagne.webp", "logo-champagne"],
  ];
  for (const [file, name] of variants) {
    const input = `${SRC}/${file}`;
    await sharp(input).trim().resize({ width: 720 }).webp({ quality: 90 }).toFile(`${OUT}/${name}.webp`);

    // O monograma é o primeiro bloco de linhas com conteúdo (acima do nome).
    const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
    let end = 0;
    for (let y = 0, started = false; y < info.height; y++) {
      let filled = false;
      for (let x = 0; x < info.width; x++) {
        if (data[(y * info.width + x) * 4 + 3] > 40) { filled = true; break; }
      }
      if (filled) started = true;
      else if (started) { end = y; break; }
    }
    const cropped = await sharp(input).extract({ left: 0, top: 0, width: info.width, height: end }).png().toBuffer();
    await sharp(cropped)
      .trim()
      .resize({ height: 160 })
      .webp({ quality: 90 })
      .toFile(`${OUT}/${name}-monograma.webp`);
  }
  console.log("logos: ok");
}

/** Selo circular da campanha: recorte em círculo sobre fundo transparente. */
async function campaignBadge() {
  const input = `${SRC}/selo-black-friday-grupo-vip.jpg`;
  const { width } = await sharp(input).metadata();
  const r = Math.round(width / 2) - 14;
  const c = Math.round(width / 2) - 5;
  const mask = Buffer.from(
    `<svg width="${width}" height="${width}"><circle cx="${c}" cy="${c}" r="${r}" fill="#fff"/></svg>`,
  );
  const masked = await sharp(input).ensureAlpha().composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  const cut = await sharp(masked).extract({ left: c - r, top: c - r, width: r * 2, height: r * 2 }).png().toBuffer();
  await sharp(cut).resize({ width: 360 }).webp({ quality: 85 }).toFile(`${OUT}/selo-grupo-vip.webp`);
  console.log("selo: ok");
}

/** Favicon e ícones: monograma champagne sobre grafite. */
async function icons() {
  const mono = `${SRC}/logo-champagne.webp`;
  const { data, info } = await sharp(mono).raw().toBuffer({ resolveWithObject: true });
  let end = 0;
  for (let y = 0, started = false; y < info.height; y++) {
    let filled = false;
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 40) { filled = true; break; }
    }
    if (filled) started = true;
    else if (started) { end = y; break; }
  }
  const cropped = await sharp(mono).extract({ left: 0, top: 0, width: info.width, height: end }).png().toBuffer();
  const monogram = await sharp(cropped).trim().png().toBuffer();

  for (const [size, file, pad] of [
    [32, "favicon-32.png", 0.14],
    [180, "apple-touch-icon.png", 0.2],
    [512, "icon-512.png", 0.2],
  ]) {
    const inner = Math.round(size * (1 - pad * 2));
    const glyph = await sharp(monogram).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
    const meta = await sharp(glyph).metadata();
    await sharp({ create: { width: size, height: size, channels: 4, background: GRAPHITE } })
      .composite([{ input: glyph, left: Math.round((size - meta.width) / 2), top: Math.round((size - meta.height) / 2) }])
      .png()
      .toFile(`public/${file}`);
  }
  console.log("ícones: ok");
}

/** Imagem de compartilhamento (Open Graph) 1200x630: logotipo + fotografia oficial. */
async function ogImage() {
  const W = 1200;
  const H = 630;
  const photoW = 470;
  const photo = await sharp(`${SRC}/dr-andre-menegat.jpg`)
    .resize({ width: photoW, height: H, fit: "cover", position: "top" })
    .toBuffer();
  const logo = await sharp(`${SRC}/logo-dourado.webp`).trim().resize({ width: 520 }).toBuffer();
  const lm = await sharp(logo).metadata();
  const textArea = W - photoW;
  const rule = Buffer.from(
    `<svg width="${W}" height="${H}"><rect x="${textArea - 1}" y="0" width="1" height="${H}" fill="#A88C65" opacity=".5"/></svg>`,
  );
  await sharp({ create: { width: W, height: H, channels: 4, background: IVORY } })
    .composite([
      { input: logo, left: Math.round((textArea - lm.width) / 2), top: Math.round((H - lm.height) / 2) },
      { input: photo, left: textArea, top: 0 },
      { input: rule, left: 0, top: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`${OUT}/og-image.jpg`);
  console.log("og-image: ok");
}

await doctorPhoto();
await logos();
await campaignBadge();
await icons();
await ogImage();
