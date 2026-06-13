"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SidebarLeftIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Shield01Icon,
  SquareLockIcon,
  ReloadIcon,
  UploadSquare01Icon,
  PlusSignIcon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons";

const ICONS = {
  sidebar: SidebarLeftIcon,
  arrowLeft: ArrowLeft01Icon,
  arrowRight: ArrowRight01Icon,
  shield: Shield01Icon,
  lock: SquareLockIcon,
  reload: ReloadIcon,
  share: UploadSquare01Icon,
  plus: PlusSignIcon,
  grid: DashboardSquare01Icon,
} as const;

type IconKey = keyof typeof ICONS;
type IconData = ReadonlyArray<readonly [string, Record<string, string | number>]>;

function iconToSvg(data: IconData, color: string, sw = 1.6): string {
  const inner = data
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
      return `<${tag} ${attrStr}/>`;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" color="${color}" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}

function svgToImage(svg: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  });
}

// Browser frame logical dimensions
const WIN_W = 1280;
const DEFAULT_CONTENT_H = 720;
const CHROME_H = 56; // single row: traffic lights + nav + url bar
const WIN_RADIUS = 12;
const RENDER_SCALE = 2;

const FALLBACK_BG = "lab(10.289 -17.2405 14.685)";

type Media =
  | { kind: "image"; el: HTMLImageElement; w: number; h: number }
  | { kind: "video"; el: HTMLVideoElement; w: number; h: number };

type Theme = "dark" | "light";

const THEMES: Record<
  Theme,
  {
    chrome: string;
    chromeStroke: string;
    tabActive: string;
    tabText: string;
    urlBar: string;
    urlText: string;
    muted: string;
  }
> = {
  dark: {
    chrome: "#1d1f24",
    chromeStroke: "#2a2c30",
    tabActive: "#15171b",
    tabText: "#e6e6e8",
    urlBar: "#2a2c30",
    urlText: "#d0d0d4",
    muted: "#ffffff",
  },
  light: {
    chrome: "#e8e8ea",
    chromeStroke: "#d0d0d2",
    tabActive: "#ffffff",
    tabText: "#1a1a1c",
    urlBar: "#ffffff",
    urlText: "#3a3a3c",
    muted: "#6a6a6e",
  },
};

export function Mockup() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<Media | null>(null);
  const [padding, setPadding] = useState(11);
  const [theme, setTheme] = useState<Theme>("dark");
  const [url, setUrl] = useState("cobaltpf.com");
  const [tabTitle, setTabTitle] = useState("Sriket Komali");
  const [solidBg, setSolidBg] = useState(false);
  const [fit, setFit] = useState<"cover" | "contain">("contain");
  const [autoSize, setAutoSize] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const solidOverrideRef = useRef<boolean | null>(null);
  const rafRef = useRef<number | null>(null);
  const iconsRef = useRef<Partial<Record<IconKey, HTMLImageElement>>>({});
  const [iconsReady, setIconsReady] = useState(0);

  const CONTENT_H =
    autoSize && media
      ? Math.round(WIN_W * (media.h / media.w))
      : DEFAULT_CONTENT_H;
  const WIN_H = CHROME_H + CONTENT_H;
  const canvasW = (WIN_W + padding * 2) * RENDER_SCALE;
  const canvasH = (WIN_H + padding * 2) * RENDER_SCALE;

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.scale(RENDER_SCALE, RENDER_SCALE);

    const cw = WIN_W + padding * 2;
    const ch = WIN_H + padding * 2;
    ctx.clearRect(0, 0, cw, ch);
    const useSolid = solidOverrideRef.current ?? solidBg;
    if (useSolid) {
      ctx.fillStyle = FALLBACK_BG;
      ctx.fillRect(0, 0, cw, ch);
    }

    ctx.translate(padding, padding);
    const t = THEMES[theme];

    // Drop shadow under window
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 12;
    ctx.fillStyle = t.chrome;
    roundRect(ctx, 0, 0, WIN_W, WIN_H, WIN_RADIUS);
    ctx.fill();
    ctx.restore();

    // Window clip
    ctx.save();
    roundRect(ctx, 0, 0, WIN_W, WIN_H, WIN_RADIUS);
    ctx.clip();

    // Chrome
    ctx.fillStyle = t.chrome;
    ctx.fillRect(0, 0, WIN_W, CHROME_H);

    const cy = CHROME_H / 2;

    // Traffic lights
    drawCircle(ctx, 22, cy, 7, "#ff5f57");
    drawCircle(ctx, 42, cy, 7, "#febc2e");
    drawCircle(ctx, 62, cy, 7, "#28c840");

    // Chrome bottom border
    ctx.fillStyle = t.chromeStroke;
    ctx.fillRect(0, CHROME_H - 1, WIN_W, 1);

    const ICON_SIZE = 18;
    const drawIcon = (key: IconKey, x: number, y: number, alpha = 1) => {
      const img = iconsRef.current[key];
      if (!img) return;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, x, y - ICON_SIZE / 2, ICON_SIZE, ICON_SIZE);
      ctx.globalAlpha = 1;
    };

    // Sidebar
    drawIcon("sidebar", 92, cy);
    // Back / forward (faded)
    drawIcon("arrowLeft", 140, cy, 0.4);
    drawIcon("arrowRight", 162, cy, 0.4);

    // URL bar — centered
    const urlH = 30;
    const urlW = 420;
    const urlX = (WIN_W - urlW) / 2;
    const urlY = (CHROME_H - urlH) / 2;
    ctx.fillStyle = t.urlBar;
    roundRect(ctx, urlX, urlY, urlW, urlH, 6);
    ctx.fill();

    // Shield (left of URL bar)
    drawIcon("shield", urlX - 28, cy);
    // Lock inside URL bar (left)
    drawIcon("lock", urlX + 8, cy);

    // URL text centered w/ extra letter spacing
    ctx.fillStyle = t.urlText;
    ctx.font =
      "13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      "0.2px";
    ctx.fillText(url, urlX + urlW / 2, cy + 1);
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      "0px";
    ctx.textAlign = "left";

    // Reload inside URL bar (right)
    drawIcon("reload", urlX + urlW - 26, cy);

    // Right-side icons: share, plus, grid
    drawIcon("share", WIN_W - 105, cy);
    drawIcon("plus", WIN_W - 75, cy);
    drawIcon("grid", WIN_W - 45, cy);

    // Content area
    ctx.fillStyle = theme === "dark" ? "#0a0a0a" : "#fff";
    ctx.fillRect(0, CHROME_H, WIN_W, CONTENT_H);

    if (media) {
      const scale =
        fit === "cover"
          ? Math.max(WIN_W / media.w, CONTENT_H / media.h)
          : Math.min(WIN_W / media.w, CONTENT_H / media.h);
      const dw = media.w * scale;
      const dh = media.h * scale;
      const dx = (WIN_W - dw) / 2;
      const dy = CHROME_H + (CONTENT_H - dh) / 2;
      try {
        ctx.drawImage(media.el, dx, dy, dw, dh);
      } catch {}
    }

    ctx.restore();

    // Subtle border
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 1;
    roundRect(ctx, 0.5, 0.5, WIN_W - 1, WIN_H - 1, WIN_RADIUS);
    ctx.stroke();

    ctx.restore();
  }, [media, padding, theme, url, tabTitle, solidBg, fit, CONTENT_H, WIN_H]);

  // Rasterize icons whenever theme changes
  useEffect(() => {
    let cancelled = false;
    const color = THEMES[theme].muted;
    (async () => {
      const next: Partial<Record<IconKey, HTMLImageElement>> = {};
      await Promise.all(
        (Object.entries(ICONS) as Array<[IconKey, IconData]>).map(
          async ([k, data]) => {
            const svg = iconToSvg(data, color);
            next[k] = await svgToImage(svg);
          },
        ),
      );
      if (!cancelled) {
        iconsRef.current = next;
        setIconsReady((n) => n + 1);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [theme]);

  useEffect(() => {
    let stopped = false;
    const tick = () => {
      if (stopped) return;
      drawFrame();
      rafRef.current = requestAnimationFrame(tick);
    };
    if (media?.kind === "video") tick();
    else drawFrame();
    return () => {
      stopped = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [media, drawFrame, iconsReady]);

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
      if (blob) downloadBlob(blob, "browser-mockup.png");
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
    // For transparent WebM prefer VP8 (MediaRecorder + VP9 strips alpha in
    // Chrome). For solid, VP9 compresses better.
    const mimeCandidates =
      format === "mp4"
        ? ["video/mp4;codecs=avc1", "video/mp4"]
        : useSolid
          ? ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"]
          : ["video/webm;codecs=vp8", "video/webm;codecs=vp9", "video/webm"];
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
        downloadBlob(blob, `browser-mockup-${suffix}.${ext}`);
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
    await new Promise<void>((res) => {
      const vfc = (
        video as HTMLVideoElement & {
          requestVideoFrameCallback?: (cb: () => void) => void;
        }
      ).requestVideoFrameCallback;
      if (vfc) {
        vfc.call(video, () => res());
        setTimeout(res, 500);
      } else {
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
      if (mode === "webm-transparent" || mode === "all")
        await recordPass(false, "webm");
      if (mode === "webm-solid" || mode === "all")
        await recordPass(true, "webm");
      if (mode === "mp4-solid" || mode === "all")
        await recordPass(true, "mp4");
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
          style={{ width: "100%", maxWidth: 720, height: "auto" }}
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
            {media
              ? "Click or drop new file"
              : "Click to browse · PNG/JPG/MP4/MOV/WebM"}
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

        <div>
          <span className="block mb-1 text-muted-foreground">Theme</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTheme("dark")}
              className={`rounded border py-2 text-xs ${
                theme === "dark"
                  ? "border-foreground ring-2 ring-foreground/40"
                  : "border-border"
              }`}
              style={{ background: "#2a2a2c", color: "#fff" }}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`rounded border py-2 text-xs ${
                theme === "light"
                  ? "border-foreground ring-2 ring-foreground/40"
                  : "border-border"
              }`}
              style={{ background: "#e8e8ea", color: "#111" }}
            >
              Light
            </button>
          </div>
        </div>

        <label className="block">
          <span className="block mb-1 text-muted-foreground">Tab title</span>
          <input
            type="text"
            value={tabTitle}
            onChange={(e) => setTabTitle(e.target.value)}
            className="w-full rounded border border-border bg-transparent px-2 py-1"
          />
        </label>

        <label className="block">
          <span className="block mb-1 text-muted-foreground">URL</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded border border-border bg-transparent px-2 py-1"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoSize}
            onChange={(e) => setAutoSize(e.target.checked)}
          />
          <span>Auto-size window to media (no letterbox)</span>
        </label>

        <div>
          <span className="block mb-1 text-muted-foreground">Fit</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setFit("contain")}
              className={`rounded border py-1.5 text-xs ${
                fit === "contain"
                  ? "border-foreground ring-2 ring-foreground/40"
                  : "border-border"
              }`}
            >
              Contain
            </button>
            <button
              onClick={() => setFit("cover")}
              className={`rounded border py-1.5 text-xs ${
                fit === "cover"
                  ? "border-foreground ring-2 ring-foreground/40"
                  : "border-border"
              }`}
            >
              Cover
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={solidBg}
            onChange={(e) => setSolidBg(e.target.checked)}
          />
          <span>Solid bg (fallback color)</span>
        </label>

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

function roundRectTop(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  fill: string,
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

function truncate(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxW: number,
): string {
  if (ctx.measureText(text).width <= maxW) return text;
  let lo = 0;
  let hi = text.length;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (ctx.measureText(text.slice(0, mid) + "…").width <= maxW) lo = mid;
    else hi = mid - 1;
  }
  return text.slice(0, lo) + "…";
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
