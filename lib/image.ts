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

function wrapText(text: string, maxChars: number, maxLines = 3) {
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
  return lines.slice(0, maxLines);
}

function textLines(lines: string[], x: number, y: number, size: number, color: string, weight = 400, lineHeight = 1.35) {
  return lines
    .map((line, index) => `<text x="${x}" y="${y + index * size * lineHeight}" font-family="Noto Sans" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeHtml(line)}</text>`)
    .join("");
}

export async function renderWallpaperPng({ width, height, word, theme }: RenderOptions) {
  const pad = Math.round(width * 0.09);
  const title = [word.article, word.de_word].filter(Boolean).join(" ");
  const titleSize = getTitleSize(width, title);
  const ruSize = fontSize(width, title.length > 16 ? 0.047 : 0.052);
  const exampleSize = fontSize(width, 0.043);
  const exampleRuSize = fontSize(width, 0.036);

  const topY = Math.round(height * 0.285);
  const translationMaxChars = title.length > 16 ? 24 : 28;
  const translationLines = wrapText(word.ru_translation, translationMaxChars, 2);
  const translationBlockH = translationLines.length * ruSize * 1.24;
  const titleY = topY + 82;
  const translationY = titleY + titleSize * 1.12;
  const cardY = Math.round(translationY + translationBlockH + height * 0.045);
  const cardPad = Math.round(width * 0.035);
  const cardW = width - pad * 2;
  const formLines = word.forms
    ? [
        `Präsens: ${word.forms.praesens}`,
        `Präteritum: ${word.forms.praeteritum}`,
        `Perfekt: ${word.forms.perfekt}`,
      ]
    : [];
  const exampleLines = wrapText(word.example_de, 34, 3);
  const exampleRuLines = word.example_ru_optional ? wrapText(word.example_ru_optional, 38, 2) : [];
  const formBlockH = formLines.length ? formLines.length * exampleRuSize * 1.35 + 24 : 0;
  const cardH = Math.round(cardPad * 2 + formBlockH + exampleLines.length * exampleSize * 1.35 + exampleRuLines.length * exampleRuSize * 1.35 + 28);

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${theme.bg}"/>
    <path d="M ${Math.round(width * 0.08)} ${Math.round(height * 0.18)} C ${Math.round(width * 0.28)} ${Math.round(height * 0.08)}, ${Math.round(width * 0.56)} ${Math.round(height * 0.12)}, ${Math.round(width * 0.92)} ${Math.round(height * 0.04)}" stroke="${theme.accent}" stroke-width="2" opacity="0.22" fill="none"/>
    <path d="M ${Math.round(width * 0.1)} ${Math.round(height * 0.86)} C ${Math.round(width * 0.34)} ${Math.round(height * 0.76)}, ${Math.round(width * 0.62)} ${Math.round(height * 0.88)}, ${Math.round(width * 0.92)} ${Math.round(height * 0.72)}" stroke="${theme.subtle}" stroke-width="2" opacity="0.26" fill="none"/>
    <g opacity="0.12">
      <line x1="${pad}" y1="${Math.round(height * 0.12)}" x2="${width - pad}" y2="${Math.round(height * 0.12)}" stroke="${theme.subtle}" stroke-width="1"/>
      <line x1="${pad}" y1="${Math.round(height * 0.88)}" x2="${width - pad}" y2="${Math.round(height * 0.88)}" stroke="${theme.subtle}" stroke-width="1"/>
      <line x1="${pad}" y1="${Math.round(height * 0.12)}" x2="${pad}" y2="${Math.round(height * 0.88)}" stroke="${theme.subtle}" stroke-width="1"/>
      <line x1="${width - pad}" y1="${Math.round(height * 0.12)}" x2="${width - pad}" y2="${Math.round(height * 0.88)}" stroke="${theme.subtle}" stroke-width="1"/>
    </g>
    <text x="${pad}" y="${topY - 34}" font-family="Noto Sans" font-size="${fontSize(width, 0.026)}" font-weight="700" fill="${theme.accent}" letter-spacing="3">SPRECHE ES</text>
    <rect x="${pad}" y="${topY}" width="56" height="5" rx="3" fill="${theme.accent}"/>
    <text x="${pad}" y="${titleY}" font-family="Noto Sans" font-size="${titleSize}" font-weight="700" fill="${theme.text}" letter-spacing="-1.5">${escapeHtml(title)}</text>
    ${textLines(translationLines, pad, translationY, ruSize, theme.muted, 700, 1.24)}

    <rect x="${pad}" y="${cardY}" width="${cardW}" height="${cardH}" rx="32" fill="${theme.panel}"/>
    <rect x="${pad}" y="${cardY}" width="${cardW}" height="${cardH}" rx="32" fill="none" stroke="${theme.subtle}" stroke-width="1" opacity="0.28"/>
    <g>
      ${textLines(formLines, pad + cardPad, cardY + cardPad + exampleRuSize, exampleRuSize, theme.muted, 700)}
      ${textLines(exampleLines, pad + cardPad, cardY + cardPad + formBlockH + exampleSize, exampleSize, theme.text, 700)}
      ${textLines(exampleRuLines, pad + cardPad, cardY + cardPad + formBlockH + exampleSize + exampleLines.length * exampleSize * 1.35 + 24, exampleRuSize, theme.muted, 400)}
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
