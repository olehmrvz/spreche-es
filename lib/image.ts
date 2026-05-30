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

function wrapText(text: string, maxChars: number) {
  const words = text.split(" ");
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
  return lines.slice(0, 3);
}

function textLines(lines: string[], x: number, y: number, size: number, color: string, weight = 400, lineHeight = 1.35) {
  return lines
    .map((line, index) => `<text x="${x}" y="${y + index * size * lineHeight}" font-family="Noto Sans" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeHtml(line)}</text>`)
    .join("");
}

export async function renderWallpaperPng({ width, height, word, dateKey, theme }: RenderOptions) {
  const pad = Math.round(width * 0.09);
  const title = [word.article, word.de_word].filter(Boolean).join(" ");
  const titleSize = fontSize(width, 0.105);
  const ruSize = fontSize(width, 0.055);
  const ipaSize = fontSize(width, 0.035);
  const exampleSize = fontSize(width, 0.045);
  const exampleRuSize = fontSize(width, 0.036);

  const centerY = Math.round(height * 0.38);
  const cardY = Math.round(centerY + height * 0.19);
  const cardPad = Math.round(width * 0.035);
  const cardW = width - pad * 2;
  const formLines = word.forms
    ? [
        `Präsens: ${word.forms.praesens}`,
        `Präteritum: ${word.forms.praeteritum}`,
        `Perfekt: ${word.forms.perfekt}`,
      ]
    : [];
  const exampleLines = wrapText(word.example_de, 30);
  const exampleRuLines = word.example_ru_optional ? wrapText(word.example_ru_optional, 36) : [];
  const formBlockH = formLines.length ? formLines.length * exampleRuSize * 1.35 + 24 : 0;
  const cardH = Math.round(cardPad * 2 + formBlockH + exampleLines.length * exampleSize * 1.35 + exampleRuLines.length * exampleRuSize * 1.35 + 28);

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${theme.bg}"/>
    <circle cx="${Math.round(width * 0.18)}" cy="${Math.round(height * 0.08)}" r="${Math.round(width * 0.55)}" fill="#7c5cff" opacity="0.08"/>
    <circle cx="${Math.round(width * 0.86)}" cy="${Math.round(height * 0.16)}" r="${Math.round(width * 0.42)}" fill="${theme.accent}" opacity="0.07"/>

    <rect x="${pad}" y="${centerY}" width="64" height="6" rx="3" fill="${theme.accent}"/>
    <text x="${pad}" y="${centerY + 105}" font-family="Noto Sans" font-size="${titleSize}" font-weight="700" fill="${theme.text}" letter-spacing="-2">${escapeHtml(title)}</text>
    <text x="${pad}" y="${centerY + 105 + titleSize * 1.15}" font-family="Noto Sans" font-size="${ruSize}" font-weight="700" fill="${theme.muted}">${escapeHtml(word.ru_translation)}</text>
    ${word.ipa_optional ? `<text x="${pad}" y="${centerY + 105 + titleSize * 1.15 + ruSize * 1.25}" font-family="Noto Sans" font-size="${ipaSize}" fill="${theme.subtle}">[${escapeHtml(word.ipa_optional)}]</text>` : ""}

    <rect x="${pad}" y="${cardY}" width="${cardW}" height="${cardH}" rx="32" fill="${theme.panel}"/>
    <g>
      ${textLines(formLines, pad + cardPad, cardY + cardPad + exampleRuSize, exampleRuSize, theme.muted, 700)}
      ${textLines(exampleLines, pad + cardPad, cardY + cardPad + formBlockH + exampleSize, exampleSize, theme.text, 700)}
      ${textLines(exampleRuLines, pad + cardPad, cardY + cardPad + formBlockH + exampleSize + exampleLines.length * exampleSize * 1.35 + 24, exampleRuSize, theme.muted, 400)}
    </g>

    <text x="${pad}" y="${height - Math.round(height * 0.055)}" font-family="Noto Sans" font-size="${fontSize(width, 0.028)}" fill="${theme.subtle}">${escapeHtml(dateKey)}</text>
    <text x="${width - pad}" y="${height - Math.round(height * 0.055)}" text-anchor="end" font-family="Noto Sans" font-size="${fontSize(width, 0.028)}" fill="${theme.subtle}">${escapeHtml(word.level || "")}</text>
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
