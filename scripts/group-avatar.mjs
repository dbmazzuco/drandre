/**
 * Gera a foto do grupo VIP do WhatsApp (1080×1080) em duas versões — escura e clara —
 * com o monograma oficial e a tipografia da landing page.
 *
 * Uso: node scripts/group-avatar.mjs
 * Saída: materiais/grupo-whatsapp/
 *
 * O WhatsApp recorta a foto em círculo na lista e mostra o quadrado inteiro ao abrir:
 * o conteúdo fica centralizado e longe das bordas para funcionar nos dois casos.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SIZE = 1080;
const C = SIZE / 2;
const OUT = "materiais/grupo-whatsapp";
const FONTS = {
  serif: { file: "scripts/fonts/CormorantGaramond-600.ttf", family: "Cormorant Garamond SemiBold" },
  label: { file: "scripts/fonts/Manrope-700.ttf", family: "Manrope Static Bold" },
};

const THEMES = {
  escuro: {
    bgCenter: "#24211D",
    bgEdge: "#0D0C0B",
    title: ["#F1E7D3", "#C8AC7E"], // gradiente fosco, de cima para baixo
    label: "#D8C6A6",
    logo: "brand-assets/logo-champagne.webp",
    grain: 14,
  },
  claro: {
    bgCenter: "#FBF8F3",
    bgEdge: "#EFE8DC",
    title: ["#2A2724", "#141312"],
    label: "#6F5638",
    logo: "brand-assets/logo-dourado.webp",
    grain: 8,
  },
};

/** Texto com a fonte da marca, recortado no limite exato das letras (fundo transparente). */
async function text(content, { font, size, tracking = 0, color = "#ffffff" }) {
  const spacing = Math.round(tracking * size * 1024);
  const markup = `<span foreground="${color}" letter_spacing="${spacing}">${content}</span>`;
  const raw = await sharp({
    text: { text: markup, font: `${font.family} ${size}`, fontfile: font.file, rgba: true, dpi: 72 },
  })
    .png()
    .toBuffer();
  return sharp(raw).trim({ threshold: 1 }).png().toBuffer();
}

/** Preenche a máscara de um texto com um degradê vertical. */
async function gradientFill(mask, [top, bottom]) {
  const { width, height } = await sharp(mask).metadata();
  const gradient = Buffer.from(
    `<svg width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>` +
      `<rect width="100%" height="100%" fill="url(#g)"/></svg>`,
  );
  return sharp(gradient).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

/** Primeiro bloco de linhas com conteúdo do logotipo = monograma "AM". */
async function monogram(file, height) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  let end = 0;
  for (let y = 0, started = false; y < info.height; y++) {
    let filled = false;
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 40) {
        filled = true;
        break;
      }
    }
    if (filled) started = true;
    else if (started) {
      end = y;
      break;
    }
  }
  const crop = await sharp(file).extract({ left: 0, top: 0, width: info.width, height: end }).png().toBuffer();
  const trimmed = await sharp(crop).trim().png().toBuffer();
  return sharp(trimmed).resize({ height }).png().toBuffer();
}

/** Ruído fino e uniforme, como papel impresso — tira o aspecto "digital" do fundo liso. */
function grain(alpha) {
  const px = Buffer.alloc(SIZE * SIZE * 4);
  for (let i = 0; i < SIZE * SIZE; i++) {
    const v = Math.random() < 0.5 ? 0 : 255;
    px[i * 4] = px[i * 4 + 1] = px[i * 4 + 2] = v;
    px[i * 4 + 3] = Math.round(Math.random() * alpha);
  }
  return sharp(px, { raw: { width: SIZE, height: SIZE, channels: 4 } }).png().toBuffer();
}

async function render(name, t) {
  // Fundo liso (sem anéis: ao abrir a foto no WhatsApp a imagem aparece quadrada).
  const labelY = 812;
  const background = Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="46%" r="62%">
          <stop offset="0" stop-color="${t.bgCenter}"/>
          <stop offset="1" stop-color="${t.bgEdge}"/>
        </radialGradient>
      </defs>
      <rect width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>
    </svg>`);

  const mono = await monogram(t.logo, 158);
  const black = await gradientFill(await text("BLACK", { font: FONTS.serif, size: 176, tracking: 0.07 }), t.title);
  const friday = await gradientFill(await text("FRIDAY", { font: FONTS.serif, size: 176, tracking: 0.07 }), t.title);
  const label = await text("GRUPO VIP", { font: FONTS.label, size: 33, tracking: 0.36, color: t.label });

  const [m, b, f, l] = await Promise.all([mono, black, friday, label].map((buf) => sharp(buf).metadata()));
  const center = (w) => Math.round(C - w / 2);

  // Pilha vertical: monograma → BLACK → FRIDAY → rótulo, centrada no círculo.
  const monoTop = 228;
  const blackTop = monoTop + m.height + 68;
  const fridayTop = blackTop + b.height + 40;
  const labelTop = Math.max(labelY - Math.round(l.height / 2), fridayTop + f.height + 58);
  const ruleY = labelTop + Math.round(l.height / 2);
  const gap = 34;
  const ruleLen = 64;
  const left = center(l.width) - gap;
  const right = center(l.width) + l.width + gap;
  const rules = Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <g stroke="${t.label}" stroke-width="1.6" opacity="0.85">
        <line x1="${left - ruleLen}" y1="${ruleY}" x2="${left}" y2="${ruleY}"/>
        <line x1="${right}" y1="${ruleY}" x2="${right + ruleLen}" y2="${ruleY}"/>
      </g>
      <g fill="${t.label}">
        <rect x="${left - ruleLen - 12}" y="${ruleY - 4}" width="8" height="8" transform="rotate(45 ${left - ruleLen - 8} ${ruleY})"/>
        <rect x="${right + ruleLen + 4}" y="${ruleY - 4}" width="8" height="8" transform="rotate(45 ${right + ruleLen + 8} ${ruleY})"/>
      </g>
    </svg>`);

  const file = `${OUT}/foto-grupo-black-friday-${name}.png`;
  await sharp(background)
    .composite([
      { input: await grain(t.grain), left: 0, top: 0 },
      { input: mono, left: center(m.width), top: monoTop },
      { input: black, left: center(b.width), top: blackTop },
      { input: friday, left: center(f.width), top: fridayTop },
      { input: rules, left: 0, top: 0 },
      { input: label, left: center(l.width), top: labelTop },
    ])
    .png({ compressionLevel: 9 })
    .toFile(file);
  console.log(file, { monoTop, blackTop, fridayTop, labelTop, widths: [b.width, f.width, l.width] });
  return file;
}

await mkdir(OUT, { recursive: true });
for (const [name, theme] of Object.entries(THEMES)) await render(name, theme);
