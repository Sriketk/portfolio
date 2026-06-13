"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Platform = "desktop" | "mobile" | "raycast";

export type ShowcaseItem = {
  key: string;
  dark: string;
  light: string;
  caption?: string;
};

export type ShowcaseData = Record<Platform, ShowcaseItem[]>;

const ASPECT_CLASS: Record<Platform, string> = {
  desktop: "aspect-[16/10]",
  mobile: "aspect-[9/19.5]",
  raycast: "aspect-[16/10]",
};

function isVideo(src: string): boolean {
  return /\.(mp4|webm)$/i.test(src);
}

function posterFor(src: string): string {
  return src.replace(/\.(mp4|webm|mov)$/i, ".poster.jpg");
}

function LazyVideo({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const poster = posterFor(src);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded) {
            v.src = src;
            setLoaded(true);
          }
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.15, rootMargin: "200px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, loaded]);
  return (
    <video
      ref={ref}
      loop
      muted
      playsInline
      preload="none"
      poster={poster}
      className={className}
    />
  );
}

function Media({
  src,
  aspect,
  maxWidth,
}: {
  src: string;
  aspect: string;
  maxWidth: string;
}) {
  return (
    <div
      className={`relative ${aspect} mx-auto w-full ${maxWidth} overflow-hidden rounded-lg`}
    >
      {isVideo(src) ? (
        <LazyVideo
          key={src}
          src={src}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      )}
    </div>
  );
}

export function ShowcaseClient({
  data,
  platforms,
}: {
  data: ShowcaseData;
  platforms: Platform[];
}) {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  return (
    <main className="space-y-16 pb-24">
      <div>
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-border p-1 text-sm">
            <button
              onClick={() => setMode("dark")}
              className={`rounded-full px-3 py-1 transition-colors ${
                mode === "dark"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setMode("light")}
              className={`rounded-full px-3 py-1 transition-colors ${
                mode === "light"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Light
            </button>
          </div>
        </div>
      </div>

      {platforms.map((platform) => {
        const items = data[platform];
        if (items.length === 0) return null;
        const aspect = ASPECT_CLASS[platform];
        const maxWidth =
          platform === "mobile" ? "max-w-[300px]" : "max-w-3xl";
        return (
          <section key={platform}>
            <div className="flex flex-col gap-6">
              {items.map((item) => {
                const src = mode === "dark" ? item.dark : item.light;
                return (
                  <figure key={item.key} className="space-y-2">
                    <Media src={src} aspect={aspect} maxWidth={maxWidth} />
                    {item.caption && (
                      <figcaption className="whitespace-pre-line text-center text-base text-muted-foreground">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
