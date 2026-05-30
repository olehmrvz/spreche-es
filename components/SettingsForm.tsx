"use client";

import { useMemo, useState } from "react";
import { DEVICES } from "@/lib/devices";
import { THEMES } from "@/lib/themes";

export function SettingsForm() {
  const [device, setDevice] = useState("iphone_16_pro");
  const [theme, setTheme] = useState("dark");
  const [tz, setTz] = useState("Europe/Moscow");
  const [seed, setSeed] = useState("default");
  const [copied, setCopied] = useState(false);

  const url = useMemo(() => {
    const p = new URLSearchParams({ device, theme, tz, seed });
    const origin = typeof window === "undefined" ? "" : window.location.origin;
    return `${origin}/api/wallpaper?${p.toString()}`;
  }, [device, theme, tz, seed]);

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
          <label>Часовой пояс</label>
          <select value={tz} onChange={(e) => setTz(e.target.value)}>
            <option value="Europe/Moscow">Europe/Moscow</option>
            <option value="Europe/Berlin">Europe/Berlin</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div>
          <label>Seed</label>
          <input value={seed} onChange={(e) => setSeed(e.target.value)} />
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
