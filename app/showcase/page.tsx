import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ShowcaseClient, type ShowcaseData, type Platform } from "./showcase-client";

const PLATFORMS: Platform[] = ["desktop", "mobile", "raycast"];

function loadCaptions(): Record<Platform, Record<string, string>> {
  const path = join(process.cwd(), "public", "showcase", "captions.json");
  if (!existsSync(path)) return { desktop: {}, mobile: {}, raycast: {} };
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return { desktop: {}, mobile: {}, raycast: {} };
  }
}

function listShots(
  platform: Platform,
  captions: Record<Platform, Record<string, string>>,
): ShowcaseData[Platform] {
  const dir = join(process.cwd(), "public", "showcase", platform);
  if (!existsSync(dir)) return [];
  const files = readdirSync(dir).filter((f) =>
    /\.(png|jpg|jpeg|webp|gif|mp4|webm)$/i.test(f),
  );
  const groups = new Map<string, { dark?: string; light?: string }>();
  for (const f of files.sort()) {
    const ext = f.match(/\.(png|jpg|jpeg|webp|gif|mp4|webm)$/i)?.[0] ?? "";
    const base = f.slice(0, f.length - ext.length);
    let mode: "dark" | "light" | "default" = "default";
    let key = base;
    if (/\.dark$/i.test(base)) {
      mode = "dark";
      key = base.replace(/\.dark$/i, "");
    } else if (/\.light$/i.test(base)) {
      mode = "light";
      key = base.replace(/\.light$/i, "");
    }
    const src = `/showcase/${platform}/${f}`;
    const existing = groups.get(key) ?? {};
    if (mode === "dark") existing.dark = src;
    else if (mode === "light") existing.light = src;
    else {
      existing.dark = existing.dark ?? src;
      existing.light = existing.light ?? src;
    }
    groups.set(key, existing);
  }
  return Array.from(groups.entries()).map(([key, v]) => ({
    key,
    dark: v.dark ?? v.light!,
    light: v.light ?? v.dark!,
    caption: captions[platform]?.[key],
  }));
}

export default function ShowcasePage() {
  const captions = loadCaptions();
  const data: ShowcaseData = {
    desktop: listShots("desktop", captions),
    mobile: listShots("mobile", captions),
    raycast: listShots("raycast", captions),
  };
  return <ShowcaseClient data={data} platforms={PLATFORMS} />;
}
