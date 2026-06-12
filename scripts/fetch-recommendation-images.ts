import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { getRecommendations, type Recommendation } from "../lib/recommendations";

const TMDB_KEY = process.env.TMDB_API_KEY;
if (!TMDB_KEY) {
  console.warn("No TMDB_API_KEY — skipping movie fetches, keeping existing entries.");
}

const OUT = join(process.cwd(), "lib", "recommendation-images.json");
const AUDIO_OUT = join(process.cwd(), "lib", "recommendation-audio.json");

function loadJson(path: string): Record<string, string> {
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

const existingImagesRaw = loadJson(OUT);
const existingAudioRaw = loadJson(AUDIO_OUT);
const existingImages: Record<string, string> = Object.fromEntries(
  Object.entries(existingImagesRaw).filter(([k]) => !k.startsWith("music:")),
);
const audioMap: Record<string, string> = Object.fromEntries(
  Object.entries(existingAudioRaw).filter(([k]) => !k.startsWith("music:")),
);

function recKey(r: Recommendation): string {
  return r.category === "music" && r.artist
    ? `${r.category}:${r.title}:${r.artist}`
    : `${r.category}:${r.title}`;
}

function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
  } catch {}
  return null;
}

async function tmdbPoster(title: string, kind: "movie" | "tv"): Promise<string | null> {
  if (!TMDB_KEY) return null;
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

function parseAppleUrl(url: string): { trackId?: string; albumId?: string } | null {
  try {
    const u = new URL(url);
    const trackId = u.searchParams.get("i") ?? undefined;
    const parts = u.pathname.split("/").filter(Boolean);
    const albumId = parts[parts.length - 1];
    return { trackId, albumId };
  } catch {
    return null;
  }
}

async function itunesLookup(
  key: string,
  url: string,
): Promise<string | null> {
  const parsed = parseAppleUrl(url);
  if (!parsed) return null;
  const id = parsed.trackId ?? parsed.albumId;
  if (!id) return null;
  const entity = parsed.trackId ? "song" : "song";
  const lookupUrl = parsed.trackId
    ? `https://itunes.apple.com/lookup?id=${id}&entity=song`
    : `https://itunes.apple.com/lookup?id=${id}&entity=song`;
  const res = await fetch(lookupUrl);
  if (!res.ok) return null;
  const data = (await res.json()) as {
    results?: Array<{
      wrapperType?: string;
      kind?: string;
      artworkUrl100?: string;
      artworkUrl600?: string;
      previewUrl?: string;
    }>;
  };
  const results = data.results ?? [];
  const track = results.find((r) => r.kind === "song") ?? results[0];
  if (!track) return null;
  if (track.previewUrl) audioMap[key] = track.previewUrl;
  return (
    track.artworkUrl600 ??
    track.artworkUrl100?.replace("100x100", "600x600") ??
    null
  );
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

type SongResult = {
  artworkUrl100?: string;
  artworkUrl600?: string;
  previewUrl?: string;
  trackName?: string;
  artistName?: string;
};

function scoreResult(r: SongResult, title: string, artist?: string): number {
  const nTitle = normalize(title);
  const nArtist = artist ? normalize(artist) : "";
  const rTitle = normalize(r.trackName ?? "");
  const rArtist = normalize(r.artistName ?? "");
  let score = 0;
  if (rTitle === nTitle) score += 5;
  else if (rTitle.includes(nTitle) || nTitle.includes(rTitle)) score += 2;
  if (nArtist) {
    if (rArtist === nArtist) score += 5;
    else if (rArtist.includes(nArtist) || nArtist.includes(rArtist)) score += 3;
    else {
      const artistTokens = nArtist.split(" ");
      const hits = artistTokens.filter((t) => t.length > 2 && rArtist.includes(t)).length;
      score += hits;
    }
  }
  return score;
}

async function searchSongs(term: string): Promise<SongResult[]> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=15`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = (await res.json()) as { results?: SongResult[] };
  return data.results ?? [];
}

async function itunesSong(
  key: string,
  title: string,
  artist?: string,
): Promise<string | null> {
  const terms = [
    artist ? `${title} ${artist}` : title,
    title,
    artist ? artist : "",
  ].filter(Boolean);
  let best: { r: SongResult; score: number } | null = null;
  for (const term of terms) {
    const results = await searchSongs(term);
    for (const r of results) {
      const score = scoreResult(r, title, artist);
      if (!best || score > best.score) best = { r, score };
    }
    if (best && best.score >= 8) break;
  }
  if (!best || best.score < 2) return null;
  const r = best.r;
  if (r.previewUrl) audioMap[key] = r.previewUrl;
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
    case "music": {
      const k = recKey(r);
      if (r.apple) return itunesLookup(k, r.apple);
      return itunesSong(k, r.title, r.artist);
    }
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

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function main() {
  const recs = getRecommendations();
  const map: Record<string, string> = { ...existingImages };
  for (const r of recs) {
    const key = recKey(r);
    try {
      const img = await resolveImage(r);
      await sleep(300);
      if (img) {
        map[key] = img;
        console.log(`✓ ${key} → ${img}`);
      } else if (existingImages[key]) {
        console.log(`= ${key} (kept existing)`);
      } else {
        console.log(`· ${key} (no image)`);
      }
    } catch (e) {
      console.warn(`✗ ${key}`, e);
    }
  }
  writeFileSync(OUT, JSON.stringify(map, null, 2) + "\n");
  writeFileSync(AUDIO_OUT, JSON.stringify(audioMap, null, 2) + "\n");
  console.log(`\nWrote ${OUT}`);
  console.log(`Wrote ${AUDIO_OUT}`);
}

main();
