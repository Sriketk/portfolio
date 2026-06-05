import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { getRecommendations, type Recommendation } from "../lib/recommendations";

const TMDB_KEY = process.env.TMDB_API_KEY;
if (!TMDB_KEY) {
  console.error("Missing TMDB_API_KEY in env");
  process.exit(1);
}

const OUT = join(process.cwd(), "lib", "recommendation-images.json");

function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
  } catch {}
  return null;
}

async function tmdbPoster(title: string, kind: "movie" | "tv"): Promise<string | null> {
  const url = `https://api.themoviedb.org/3/search/${kind}?api_key=${TMDB_KEY}&query=${encodeURIComponent(title)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as { results?: Array<{ poster_path?: string | null }> };
  const path = data.results?.[0]?.poster_path;
  return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
}

async function itunesArt(title: string, entity: "podcast" | "album"): Promise<string | null> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(title)}&entity=${entity}&limit=1`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as { results?: Array<{ artworkUrl100?: string; artworkUrl600?: string }> };
  const r = data.results?.[0];
  if (!r) return null;
  return r.artworkUrl600 ?? r.artworkUrl100?.replace("100x100", "600x600") ?? null;
}

async function resolveImage(r: Recommendation): Promise<string | null> {
  if (r.link) {
    const id = youtubeId(r.link);
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  switch (r.category) {
    case "movies":
      return tmdbPoster(r.title, "movie");
    case "music":
      return itunesArt(r.title, "album");
    case "podcasts":
      return itunesArt(r.title, "podcast");
    case "youtube": {
      if (!r.link) return null;
      const id = youtubeId(r.link);
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
    }
    case "essays":
      return null;
  }
}

async function main() {
  const recs = getRecommendations();
  const map: Record<string, string> = {};
  for (const r of recs) {
    const key = `${r.category}:${r.title}`;
    try {
      const img = await resolveImage(r);
      if (img) {
        map[key] = img;
        console.log(`✓ ${key} → ${img}`);
      } else {
        console.log(`· ${key} (no image)`);
      }
    } catch (e) {
      console.warn(`✗ ${key}`, e);
    }
  }
  writeFileSync(OUT, JSON.stringify(map, null, 2) + "\n");
  console.log(`\nWrote ${OUT}`);
}

main();
