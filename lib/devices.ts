export const DEVICES = {
  iphone_16_pro: { width: 1179, height: 2556, label: "iPhone 16 Pro" },
  iphone_16_pro_max: { width: 1320, height: 2868, label: "iPhone 16 Pro Max" },
  iphone_16_plus: { width: 1290, height: 2796, label: "iPhone 16 Plus" },
  iphone_16: { width: 1179, height: 2556, label: "iPhone 16" },

  iphone_15_pro: { width: 1179, height: 2556, label: "iPhone 15 Pro" },
  iphone_15_pro_max: { width: 1290, height: 2796, label: "iPhone 15 Pro Max" },
  iphone_15_plus: { width: 1290, height: 2796, label: "iPhone 15 Plus" },
  iphone_15: { width: 1179, height: 2556, label: "iPhone 15" },

  iphone_14_pro: { width: 1179, height: 2556, label: "iPhone 14 Pro" },
  iphone_14_pro_max: { width: 1290, height: 2796, label: "iPhone 14 Pro Max" },
  iphone_14_plus: { width: 1284, height: 2778, label: "iPhone 14 Plus" },
  iphone_14: { width: 1170, height: 2532, label: "iPhone 14" },

  iphone_13_pro: { width: 1170, height: 2532, label: "iPhone 13 Pro" },
  iphone_13_pro_max: { width: 1284, height: 2778, label: "iPhone 13 Pro Max" },
  iphone_13: { width: 1170, height: 2532, label: "iPhone 13" },
  iphone_13_mini: { width: 1080, height: 2340, label: "iPhone 13 mini" },

  iphone_12_pro: { width: 1170, height: 2532, label: "iPhone 12 Pro" },
  iphone_12_pro_max: { width: 1284, height: 2778, label: "iPhone 12 Pro Max" },
  iphone_12: { width: 1170, height: 2532, label: "iPhone 12" },
  iphone_12_mini: { width: 1080, height: 2340, label: "iPhone 12 mini" },

  iphone_11_pro: { width: 1125, height: 2436, label: "iPhone 11 Pro / X / XS" },
  iphone_11_pro_max: { width: 1242, height: 2688, label: "iPhone 11 Pro Max / XS Max" },
  iphone_11: { width: 828, height: 1792, label: "iPhone 11 / XR" },

  iphone_se_3: { width: 750, height: 1334, label: "iPhone SE 2/3" },
  iphone_8_plus: { width: 1080, height: 1920, label: "iPhone 8 Plus / 7 Plus" },

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
