import { Resvg } from "@resvg/resvg-js";
import { join } from "node:path";
import type { Word } from "./words";
import { escapeHtml } from "./escape";

function getFontPath() {
  return join(process.cwd(), "public", "fonts", "NotoSans.ttf");
}

type Theme = {
  bg: string;
  panel: string;
  text: string;
  muted: string;
  subtle: string;
  accent: string;
};

type RenderOptions = {
  width: number;
  height: number;
  word: Word;
  dateKey: string;
  theme: Theme;
};

function fontSize(width: number, ratio: number) {
  return Math.round(width * ratio);
}

function getTitleSize(width: number, title: string) {
  const cleanLength = title.replaceAll(" ", "").length;
  const base = fontSize(width, 0.105);
  if (cleanLength <= 10) return base;
  if (cleanLength <= 13) return fontSize(width, 0.092);
  if (cleanLength <= 16) return fontSize(width, 0.078);
  if (cleanLength <= 20) return fontSize(width, 0.066);
  return fontSize(width, 0.058);
}

function wrapLongToken(token: string, maxChars: number) {
  const chunks: string[] = [];
  for (let i = 0; i < token.length; i += maxChars) {
    chunks.push(token.slice(i, i + maxChars));
  }
  return chunks;
}

function wrapText(text: string, maxChars: number, maxLines = 3) {
  const words = text.split(" ").flatMap((word) =>
    word.length > maxChars ? wrapLongToken(word, Math.max(6, maxChars - 1)) : [word]
  );
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}

function fitWrappedText(text: string, initialSize: number, initialMaxChars: number, maxLines: number, minSize: number) {
  let size = initialSize;
  let maxChars = initialMaxChars;
  let lines = wrapText(text, maxChars, maxLines);

  while (size > minSize) {
    const allTextVisible = lines.join(" ").replaceAll(" ", "").length >= text.replaceAll(" ", "").length;
    if (lines.length <= maxLines && allTextVisible) break;
    size = Math.round(size * 0.92);
    maxChars = Math.max(12, Math.round(maxChars * 1.12));
    lines = wrapText(text, maxChars, maxLines);
  }

  return { size, lines };
}

function textLines(lines: string[], x: number, y: number, size: number, color: string, weight = 400, lineHeight = 1.35) {
  return lines
    .map((line, index) => `<text x="${x}" y="${y + index * size * lineHeight}" font-family="Noto Sans" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeHtml(line)}</text>`)
    .join("");
}

export async function renderWallpaperPng({ width, height, word, theme }: RenderOptions) {
  const pad = Math.round(width * 0.085);
  const railX = pad;
  const contentX = pad + Math.round(width * 0.045);
  const title = [word.article, word.de_word].filter(Boolean).join(" ");
  const titleSize = getTitleSize(width, title);
  const baseRuSize = fontSize(width, title.length > 16 ? 0.047 : 0.052);
  const exampleSize = fontSize(width, 0.043);
  const exampleRuSize = fontSize(width, 0.036);

  const topY = Math.round(height * 0.255);
  const translationMaxChars = title.length > 16 ? 24 : 28;
  const fittedTranslation = fitWrappedText(
    word.ru_translation,
    baseRuSize,
    translationMaxChars,
    3,
    fontSize(width, 0.034)
  );
  const ruSize = fittedTranslation.size;
  const translationLines = fittedTranslation.lines;
  const translationBlockH = translationLines.length * ruSize * 1.22;
  const brandY = topY;
  const titleY = brandY + Math.round(height * 0.075);
  const translationY = titleY + titleSize * 1.08;
  const cardY = Math.round(translationY + translationBlockH + height * 0.035);
  const cardPad = Math.round(width * 0.034);
  const cardW = width - contentX - pad;
  const formLines = word.forms
    ? [
        `Präsens: ${word.forms.praesens || word.forms.praesens_er_sie_es || ""}`,
        `Präteritum: ${word.forms.praeteritum}`,
        `Perfekt: ${word.forms.perfekt}`,
      ]
    : [];
  const exampleRu = word.example_ru || word.example_ru_optional || "";
  const exampleLines = wrapText(word.example_de, 34, 3);
  const fittedExampleRu = exampleRu
    ? fitWrappedText(exampleRu, exampleRuSize, 38, 3, fontSize(width, 0.03))
    : { size: exampleRuSize, lines: [] };
  const exampleRuLines = fittedExampleRu.lines;
  const fittedExampleRuSize = fittedExampleRu.size;
  const formBlockH = formLines.length ? formLines.length * exampleRuSize * 1.35 + 24 : 0;
  const cardH = Math.round(cardPad * 2 + formBlockH + exampleLines.length * exampleSize * 1.35 + exampleRuLines.length * fittedExampleRuSize * 1.3 + 30);

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${theme.bg}"/>
    <rect x="${railX}" y="${brandY - Math.round(width * 0.018)}" width="4" height="${cardY + cardH - brandY + Math.round(width * 0.018)}" rx="2" fill="${theme.accent}" opacity="0.72"/>
    <rect x="${contentX}" y="${brandY - Math.round(width * 0.03)}" width="${cardW}" height="1" fill="${theme.subtle}" opacity="0.22"/>
    <text x="${contentX}" y="${brandY}" font-family="Noto Sans" font-size="${fontSize(width, 0.024)}" font-weight="700" fill="${theme.accent}" letter-spacing="3">SPRECHE ES</text>
    <text x="${contentX}" y="${titleY}" font-family="Noto Sans" font-size="${titleSize}" font-weight="700" fill="${theme.text}" letter-spacing="-1.5">${escapeHtml(title)}</text>
    ${textLines(translationLines, contentX, translationY, ruSize, theme.muted, 700, 1.22)}

    <rect x="${contentX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="28" fill="${theme.panel}"/>
    <rect x="${contentX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="28" fill="none" stroke="${theme.subtle}" stroke-width="1" opacity="0.22"/>
    <g>
      ${textLines(formLines, contentX + cardPad, cardY + cardPad + exampleRuSize, exampleRuSize, theme.muted, 700)}
      ${textLines(exampleLines, contentX + cardPad, cardY + cardPad + formBlockH + exampleSize, exampleSize, theme.text, 700)}
      ${textLines(exampleRuLines, contentX + cardPad, cardY + cardPad + formBlockH + exampleSize + exampleLines.length * exampleSize * 1.35 + 22, fittedExampleRuSize, theme.muted, 400, 1.3)}
    </g>

  </svg>`;

  return new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      fontFiles: [getFontPath()],
      loadSystemFonts: false,
      defaultFontFamily: "Noto Sans",
    },
  }).render().asPng();
}
