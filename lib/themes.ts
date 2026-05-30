export const THEMES = {
  dark: {
    bg: "#07090d",
    panel: "#10131c",
    text: "#f3f4f6",
    muted: "#b8bac0",
    subtle: "#737780",
    accent: "#ff7a2f",
  },
  light: {
    bg: "#f4f1ea",
    panel: "#ffffff",
    text: "#171717",
    muted: "#5f5f5f",
    subtle: "#8a8a8a",
    accent: "#ff7a2f",
  },
  oled: {
    bg: "#000000",
    panel: "#080808",
    text: "#f5f5f5",
    muted: "#b8b8b8",
    subtle: "#737373",
    accent: "#ff7a2f",
  },
} as const;

export type ThemeKey = keyof typeof THEMES;

export function getTheme(key: string | null) {
  if (key && key in THEMES) return THEMES[key as ThemeKey];
  return THEMES.dark;
}
