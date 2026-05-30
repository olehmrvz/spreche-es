import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "German Word Wallpaper",
  description: "Немецкое слово дня на динамических PNG-обоях.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
