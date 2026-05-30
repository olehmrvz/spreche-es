export const DEVICES = {
  iphone_16_pro: { width: 1179, height: 2556, label: "iPhone 16 Pro" },
  iphone_16_pro_max: { width: 1320, height: 2868, label: "iPhone 16 Pro Max" },
  iphone_15: { width: 1179, height: 2556, label: "iPhone 15 / 15 Pro" },
  android_1080x2400: { width: 1080, height: 2400, label: "Android 1080×2400" },
} as const;

export type DeviceKey = keyof typeof DEVICES;

export function getSize(params: URLSearchParams) {
  const device = params.get("device") as DeviceKey | null;

  if (device && DEVICES[device]) return DEVICES[device];

  const width = Number(params.get("width"));
  const height = Number(params.get("height"));

  if (
    Number.isFinite(width) &&
    Number.isFinite(height) &&
    width >= 300 &&
    height >= 300 &&
    width <= 4000 &&
    height <= 4000
  ) {
    return { width, height, label: "Custom" };
  }

  return DEVICES.iphone_16_pro;
}
