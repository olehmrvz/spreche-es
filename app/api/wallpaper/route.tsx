import { NextRequest } from "next/server";
import crypto from "node:crypto";
import { getSize } from "@/lib/devices";
import { getTheme } from "@/lib/themes";
import { getWordOfDay, safeTrack } from "@/lib/words";
import { renderWallpaperPng } from "@/lib/image";

export const runtime = "nodejs";


export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const size = getSize(params);
  const themeKey = params.get("theme") || "dark";
  const theme = getTheme(themeKey);
  const seed = "global";
  const track = safeTrack(params.get("track") || params.get("level"));

  const { word, dateKey } = getWordOfDay(seed, track);
  const png = await renderWallpaperPng({
    width: size.width,
    height: size.height,
    word,
    dateKey,
    theme,
  });

  const etag = crypto
    .createHash("sha256")
    .update(`${dateKey}:${seed}:${track}:${word.id}:${size.width}:${size.height}:${themeKey}`)
    .digest("hex");

  if (req.headers.get("if-none-match") === `"${etag}"`) {
    return new Response(null, {
      status: 304,
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        ETag: `"${etag}"`,
      },
    });
  }

  return new Response(new Uint8Array(png), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      ETag: `"${etag}"`,
      "X-Wallpaper-Date": dateKey,
      "X-Wallpaper-Word": word.id,
    },
  });
}
