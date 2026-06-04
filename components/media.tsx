import type { ReactNode } from "react";

export function Caption({ children }: { children: ReactNode }) {
  return (
    <span className="mb-6 -mt-3 block text-center text-sm italic text-muted-foreground">
      {children}
    </span>
  );
}

export function YouTube({
  id,
  start,
  caption,
}: {
  id: string;
  start?: number;
  caption?: string;
}) {
  const src = `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
  return (
    <figure className="mb-6">
      <div className="relative w-full overflow-hidden rounded-xl border border-border pt-[56.25%]">
        <iframe
          src={src}
          title={caption ?? `YouTube video ${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm italic text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Video({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="mb-6">
      <video
        src={src}
        className="w-full rounded-xl border border-border"
        controls
        playsInline
        muted
        loop
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm italic text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
