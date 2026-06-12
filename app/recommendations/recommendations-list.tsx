"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  type Category,
  type Recommendation,
} from "@/lib/recommendations";
import images from "@/lib/recommendation-images.json";
import audio from "@/lib/recommendation-audio.json";

const IMAGE_MAP = images as Record<string, string>;
const AUDIO_MAP = audio as Record<string, string>;

const IMAGE_DIMS: Record<Category, { w: number; h: number }> = {
  movies: { w: 96, h: 144 },
  music: { w: 112, h: 112 },
  podcasts: { w: 112, h: 112 },
  youtube: { w: 160, h: 90 },
};

export function RecommendationsList({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const [active, setActive] = useState<Category>(CATEGORIES[0]);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filtered = recommendations.filter((r) => r.category === active);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function toggleAudio(key: string) {
    const src = AUDIO_MAP[key];
    if (!src) return;
    if (playingKey === key) {
      audioRef.current?.pause();
      setPlayingKey(null);
      return;
    }
    audioRef.current?.pause();
    const el = new Audio(src);
    audioRef.current = el;
    el.play().catch(() => {});
    el.onended = () => setPlayingKey(null);
    setPlayingKey(key);
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-6 text-sm font-medium">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={
              active === cat
                ? "text-foreground"
                : "text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
      {active === "music" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, index) => {
            const key = item.artist
              ? `${item.category}:${item.title}:${item.artist}`
              : `${item.category}:${item.title}`;
            const img = IMAGE_MAP[key];
            const hasAudio = !!AUDIO_MAP[key];
            const isPlaying = playingKey === key;
            return (
              <button
                key={index}
                onClick={() => toggleAudio(key)}
                disabled={!hasAudio}
                className="group block text-left"
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                  {img && (
                    <Image
                      src={img}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {hasAudio && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black opacity-0 transition-opacity group-hover:opacity-100">
                        {isPlaying ? "Pause" : "Play"}
                      </span>
                    </div>
                  )}
                </div>
                <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-tight text-foreground">
                  {item.title}
                </p>
                {item.artist && (
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {item.artist}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      ) : active === "movies" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {filtered.map((item, index) => {
            const img = IMAGE_MAP[`${item.category}:${item.title}`];
            const inner = (
              <div className="space-y-2">
                <div className="aspect-[2/3] overflow-hidden rounded-md bg-muted">
                  {img && (
                    <Image
                      src={img}
                      alt={item.title}
                      width={300}
                      height={450}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <p className="text-sm font-medium text-foreground">
                  {item.title}
                </p>
              </div>
            );
            return (
              <div key={index}>
                {item.link ? (
                  <Link
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group block"
                  >
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      ) : (
      <div className="space-y-8">
        {filtered.map((item, index) => {
          const img = IMAGE_MAP[`${item.category}:${item.title}`];
          const dims = IMAGE_DIMS[item.category];
          const content = (
            <div className="flex gap-4">
              {img && dims.w > 0 && (
                <div
                  className="shrink-0 overflow-hidden rounded-md bg-muted"
                  style={{ width: dims.w, height: dims.h }}
                >
                  <Image
                    src={img}
                    alt={item.title}
                    width={dims.w}
                    height={dims.h}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="mb-2 text-xl font-semibold text-foreground transition-colors">
                  {item.title}
                </h2>
                {item.description && (
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
          return (
            <article key={index}>
              {item.link ? (
                <Link
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group block"
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </article>
          );
        })}
      </div>
      )}
    </>
  );
}
