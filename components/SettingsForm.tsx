"use client";

import { useMemo, useState } from "react";
import { DEVICES } from "@/lib/devices";
import { THEMES } from "@/lib/themes";
import { TRACKS } from "@/lib/words";

export function SettingsForm() {
  const [device, setDevice] = useState("iphone_16_pro");
  const [theme, setTheme] = useState("dark");
  const [track, setTrack] = useState("A1");
  const [copied, setCopied] = useState(false);

  const url = useMemo(() => {
    const p = new URLSearchParams({ device, theme, track, v: "3" });
    const origin = typeof window === "undefined" ? "" : window.location.origin;
    return `${origin}/api/wallpaper?${p.toString()}`;
  }, [device, theme, track]);

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <section className="card">
      <div className="form">
        <div>
          <label>Модель / размер</label>
          <select value={device} onChange={(e) => setDevice(e.target.value)}>
            {Object.entries(DEVICES).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Тема</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {Object.keys(THEMES).map((key) => <option key={key} value={key}>{key}</option>)}
          </select>
        </div>
        <div>
          <label>Уровень</label>
          <select value={track} onChange={(e) => setTrack(e.target.value)}>
            {TRACKS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
      </div>

      <div className="urlBox">{url}</div>

      <div className="actions">
        <button onClick={copy}>{copied ? "Скопировано" : "Скопировать ссылку"}</button>
        <a className="button" href={url} target="_blank">Открыть PNG</a>
      </div>

      <div className="previewBox">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="Preview" />
      </div>
    </section>
  );
}
