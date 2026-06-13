"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// iPhone 16 Pro logical dimensions (pt)
const BODY_W = 393;
const BODY_H = 852;
const BODY_RADIUS = 60;
const SCREEN_INSET = 9;
const SCREEN_RADIUS = BODY_RADIUS - SCREEN_INSET;
const RENDER_SCALE = 3;

type Media =
  | { kind: "image"; el: HTMLImageElement; w: number; h: number }
  | { kind: "video"; el: HTMLVideoElement; w: number; h: number };

export function Mockup() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [media, setMedia] = useState<Media | null>(null);
  const [padding, setPadding] = useState(11);
  const [frameColor, setFrameColor] = useState("#181818");
  const [solidBg, setSolidBg] = useState(false);
  const solidOverrideRef = useRef<boolean | null>(null);
  const FALLBACK_BG = "lab(10.289 -17.2405 14.685)";
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rafRef = useRef<number | null>(null);

  const canvasW = (BODY_W + padding * 2) * RENDER_SCALE;
  const canvasH = (BODY_H + padding * 2) * RENDER_SCALE;

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.scale(RENDER_SCALE, RENDER_SCALE);

    const cw = BODY_W + padding * 2;
    const ch = BODY_H + padding * 2;
    ctx.clearRect(0, 0, cw, ch);
    const useSolid = solidOverrideRef.current ?? solidBg;
    if (useSolid) {
      ctx.fillStyle = FALLBACK_BG;
      ctx.fillRect(0, 0, cw, ch);
    }

    ctx.translate(padding, padding);

    // Body
    roundRect(ctx, 0, 0, BODY_W, BODY_H, BODY_RADIUS);
    const grad = ctx.createLinearGradient(0, 0, BODY_W, 0);
    grad.addColorStop(0, shade(frameColor, -10));
    grad.addColorStop(0.5, shade(frameColor, 20));
    grad.addColorStop(1, shade(frameColor, -10));
    ctx.fillStyle = grad;
    ctx.fill();

    // Screen clip
    ctx.save();
    roundRect(
      ctx,
      SCREEN_INSET,
      SCREEN_INSET,
      BODY_W - SCREEN_INSET * 2,
      BODY_H - SCREEN_INSET * 2,
      SCREEN_RADIUS,
    );
    ctx.clip();
    ctx.fillStyle = "#000";
    ctx.fillRect(
      SCREEN_INSET,
      SCREEN_INSET,
      BODY_W - SCREEN_INSET * 2,
      BODY_H - SCREEN_INSET * 2,
    );

    if (media) {
      const sw = BODY_W - SCREEN_INSET * 2;
      const sh = BODY_H - SCREEN_INSET * 2;
      const scale = Math.max(sw / media.w, sh / media.h);
      const dw = media.w * scale;
      const dh = media.h * scale;
      const dx = SCREEN_INSET + (sw - dw) / 2;
      const dy = SCREEN_INSET + (sh - dh) / 2;
      try {
        ctx.drawImage(media.el, dx, dy, dw, dh);
      } catch {}
    }
    ctx.restore();

    // Bezel highlight
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    roundRect(
      ctx,
      SCREEN_INSET,
      SCREEN_INSET,
      BODY_W - SCREEN_INSET * 2,
      BODY_H - SCREEN_INSET * 2,
      SCREEN_RADIUS,
    );
    ctx.stroke();

    // Side buttons
    ctx.fillStyle = shade(frameColor, -25);
    ctx.fillRect(-2, 180, 3, 36);
    ctx.fillRect(-2, 230, 3, 60);
    ctx.fillRect(-2, 310, 3, 60);
    ctx.fillRect(BODY_W - 1, 220, 3, 90);

    ctx.restore();
  }, [media, padding, frameColor, solidBg]);

  useEffect(() => {
    let stopped = false;
    const tick = () => {
      if (stopped) return;
      drawFrame();
      rafRef.current = requestAnimationFrame(tick);
    };
    if (media?.kind === "video") {
      tick();
    } else {
      drawFrame();
    }
    return () => {
      stopped = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [media, drawFrame]);

  const onFile = async (file: File) => {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image/")) {
      const img = new Image();
      img.onload = () => {
        setMedia({
          kind: "image",
          el: img,
          w: img.naturalWidth,
          h: img.naturalHeight,
        });
      };
      img.src = url;
    } else if (file.type.startsWith("video/")) {
      const v = document.createElement("video");
      v.src = url;
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      v.crossOrigin = "anonymous";
      v.onloadedmetadata = () => {
        v.play().catch(() => {});
        setMedia({
          kind: "video",
          el: v,
          w: v.videoWidth,
          h: v.videoHeight,
        });
      };
    }
  };

  const exportPNG = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setBusy(true);
    drawFrame();
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, "iphone-mockup.png");
      setBusy(false);
    }, "image/png");
  };

  const recordPass = async (
    useSolid: boolean,
    format: "webm" | "mp4",
  ): Promise<void> => {
    const canvas = canvasRef.current;
    if (!canvas || media?.kind !== "video") return;
    const video = media.el;

    solidOverrideRef.current = useSolid;
    drawFrame();

    video.loop = false;
    video.pause();
    await new Promise<void>((res) => {
      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        res();
      };
      video.addEventListener("seeked", onSeeked);
      video.currentTime = 0;
      setTimeout(() => {
        video.removeEventListener("seeked", onSeeked);
        res();
      }, 300);
    });

    const stream = canvas.captureStream(60);
    // For transparent WebM, prefer VP8 — VP9 + MediaRecorder strips alpha
    // in Chrome. VP8 preserves yuva420p properly. For solid bg either codec
    // is fine, prefer VP9 for better compression.
    const mimeCandidates =
      format === "mp4"
        ? ["video/mp4;codecs=avc1", "video/mp4"]
        : useSolid
          ? [
              "video/webm;codecs=vp9",
              "video/webm;codecs=vp8",
              "video/webm",
            ]
          : [
              "video/webm;codecs=vp8",
              "video/webm;codecs=vp9",
              "video/webm",
            ];
    const mime = mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m));
    if (!mime) {
      alert("Browser doesn't support this codec");
      return;
    }
    const recorder = new MediaRecorder(stream, {
      mimeType: mime,
      videoBitsPerSecond: 12_000_000,
    });
    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    const done = new Promise<void>((res) => {
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mime });
        const suffix = useSolid ? "solid" : "transparent";
        const ext = format === "mp4" ? "mp4" : "webm";
        downloadBlob(blob, `iphone-mockup-${suffix}.${ext}`);
        stream.getTracks().forEach((t) => t.stop());
        res();
      };
    });

    const onEnded = () => {
      video.removeEventListener("ended", onEnded);
      setTimeout(() => recorder.stop(), 100);
    };
    video.addEventListener("ended", onEnded);

    await video.play();
    // Wait for actual first decoded frame before recording starts.
    await new Promise<void>((res) => {
      const vfc = (
        video as HTMLVideoElement & {
          requestVideoFrameCallback?: (cb: () => void) => void;
        }
      ).requestVideoFrameCallback;
      if (vfc) {
        vfc.call(video, () => res());
        setTimeout(res, 500); // safety
      } else {
        const onPlaying = () => {
          video.removeEventListener("playing", onPlaying);
          res();
        };
        video.addEventListener("playing", onPlaying);
        setTimeout(res, 300);
      }
    });
    drawFrame();
    recorder.start(100);
    await done;
  };

  type ExportMode =
    | "webm-transparent"
    | "webm-solid"
    | "mp4-solid"
    | "all";

  const exportVideo = async (mode: ExportMode): Promise<void> => {
    if (media?.kind !== "video") return;
    const video = media.el;
    setBusy(true);
    setRecording(true);
    try {
      if (mode === "webm-transparent" || mode === "all") {
        await recordPass(false, "webm");
      }
      if (mode === "webm-solid" || mode === "all") {
        await recordPass(true, "webm");
      }
      if (mode === "mp4-solid" || mode === "all") {
        await recordPass(true, "mp4");
      }
    } finally {
      solidOverrideRef.current = null;
      drawFrame();
      video.loop = true;
      video.play().catch(() => {});
      setBusy(false);
      setRecording(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      <div
        className="flex items-center justify-center rounded-lg p-4 overflow-auto"
        style={{
          background:
            "repeating-conic-gradient(#222 0 25%, #2a2a2a 0 50%) 50%/16px 16px",
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasW}
          height={canvasH}
          style={{ width: "100%", maxWidth: 480, height: "auto" }}
        />
      </div>

      <div className="space-y-4 text-sm">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onFile(f);
          }}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition ${
            dragOver
              ? "border-foreground bg-foreground/10"
              : "border-border hover:border-foreground/60 hover:bg-foreground/5"
          }`}
        >
          <div className="text-base font-medium mb-1">
            {media ? "Replace media" : "Drop image or video"}
          </div>
          <div className="text-xs text-muted-foreground">
            {media ? "Click or drop new file" : "Click to browse · PNG/JPG/MP4/MOV/WebM"}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/mp4,video/quicktime,video/webm"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }}
            className="hidden"
          />
        </div>

        <label className="block">
          <span className="block mb-1 text-muted-foreground">
            Padding: {padding}px
          </span>
          <input
            type="range"
            min={0}
            max={200}
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={solidBg}
            onChange={(e) => setSolidBg(e.target.checked)}
          />
          <span>Solid bg (fallback color)</span>
        </label>

        <div>
          <span className="block mb-1 text-muted-foreground">Frame</span>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => setFrameColor("#181818")}
              className={`rounded border py-2 text-xs ${
                frameColor === "#181818"
                  ? "border-foreground ring-2 ring-foreground/40"
                  : "border-border"
              }`}
              style={{ background: "#181818", color: "#fff" }}
            >
              Dark
            </button>
            <button
              onClick={() => setFrameColor("#c7c7c7")}
              className={`rounded border py-2 text-xs ${
                frameColor === "#c7c7c7"
                  ? "border-foreground ring-2 ring-foreground/40"
                  : "border-border"
              }`}
              style={{ background: "#c7c7c7", color: "#111" }}
            >
              Light
            </button>
          </div>
          <label className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Custom</span>
            <input
              type="color"
              value={frameColor}
              onChange={(e) => setFrameColor(e.target.value)}
              className="flex-1 h-8 bg-transparent"
            />
          </label>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <button
            onClick={exportPNG}
            disabled={!media || busy}
            className="w-full rounded bg-foreground text-background py-2 disabled:opacity-40"
          >
            Export PNG
          </button>
          <button
            onClick={() => exportVideo("webm-transparent")}
            disabled={!media || media.kind !== "video" || busy}
            className="w-full rounded border border-foreground py-2 disabled:opacity-40"
          >
            {recording ? "Recording…" : "WebM transparent"}
          </button>
          <button
            onClick={() => exportVideo("webm-solid")}
            disabled={!media || media.kind !== "video" || busy}
            className="w-full rounded border border-foreground py-2 disabled:opacity-40"
          >
            {recording ? "Recording…" : "WebM solid"}
          </button>
          <button
            onClick={() => exportVideo("mp4-solid")}
            disabled={!media || media.kind !== "video" || busy}
            className="w-full rounded border border-foreground py-2 disabled:opacity-40"
          >
            {recording ? "Recording…" : "MP4 solid"}
          </button>
          <button
            onClick={() => exportVideo("all")}
            disabled={!media || media.kind !== "video" || busy}
            className="w-full rounded bg-foreground text-background py-2 disabled:opacity-40"
          >
            {recording ? "Recording…" : "Export all 3"}
          </button>
          {media?.kind === "video" && (
            <p className="text-xs text-muted-foreground">
              Each format = one playthrough. Don't navigate away.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function shade(hex: string, amt: number) {
  const m = hex.replace("#", "");
  const num = parseInt(m, 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0xff) + amt;
  let b = (num & 0xff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `rgb(${r},${g},${b})`;
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
