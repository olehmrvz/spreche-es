export const THEMES = {
  dark: {
    bg: "#07090d",
    panel: "#10131c",
    text: "#f3f4f6",
    muted: "rgba(243,244,246,0.68)",
    subtle: "rgba(243,244,246,0.42)",
    accent: "#ff7a2f",
  },
  light: {
    bg: "#f4f1ea",
    panel: "#ffffff",
    text: "#171717",
    muted: "rgba(23,23,23,0.68)",
    subtle: "rgba(23,23,23,0.42)",
    accent: "#ff7a2f",
  },
  oled: {
    bg: "#000000",
    panel: "#080808",
    text: "#f5f5f5",
    muted: "rgba(245,245,245,0.68)",
    subtle: "rgba(245,245,245,0.42)",
    accent: "#ff7a2f",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;

export function getTheme(key: string | null) {
  if (key && key in THEMES) return THEMES[key as ThemeKey];
  return THEMES.dark;
}
