#!/usr/bin/env bash
# Compress showcase videos in-place w/ ffmpeg H.264 CRF 23 (visually lossless,
# ~5x smaller) and extract first-frame poster as webp.
#
# Usage: bash scripts/compress-showcase.sh
# Re-encodes public/showcase/{desktop,mobile}/*.{mp4,webm} → *.mp4 + *.poster.webp
# Originals backed up to public/showcase/_originals/

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SHOWCASE="$ROOT/public/showcase"
BACKUP="$SHOWCASE/_originals"
CRF=18
PRESET=slow

mkdir -p "$BACKUP"

shopt -s nullglob nocaseglob

for dir in "$SHOWCASE/desktop" "$SHOWCASE/mobile"; do
  [[ -d "$dir" ]] || continue
  rel="${dir#$SHOWCASE/}"
  mkdir -p "$BACKUP/$rel"

  # Iterate sources from backup (canonical originals) when FORCE=1,
  # else from dir (first-time compression).
  if [[ "${FORCE:-0}" == "1" && -d "$BACKUP/$rel" ]]; then
    src_dir="$BACKUP/$rel"
  else
    src_dir="$dir"
  fi

  for f in "$src_dir"/*.mp4 "$src_dir"/*.webm "$src_dir"/*.mov; do
    [[ -e "$f" ]] || continue
    base="$(basename "$f")"
    name="${base%.*}"
    backup_path="$BACKUP/$rel/$base"
    out_mp4="$dir/$name.mp4"
    poster="$dir/$name.poster.jpg"

    # Skip only when not forcing AND already backed up
    if [[ "${FORCE:-0}" != "1" && -f "$backup_path" ]]; then
      echo "skip (already compressed): $rel/$base"
      continue
    fi

    echo "compressing: $rel/$base"
    [[ -f "$backup_path" ]] || cp "$f" "$backup_path"

    tmp="$dir/.tmp.$name.mp4"
    ffmpeg -y -loglevel error -i "$backup_path" \
      -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
      -c:v libx264 -crf "$CRF" -preset "$PRESET" -pix_fmt yuv420p \
      -movflags +faststart \
      -an \
      "$tmp"

    # Replace any prior output in dir, keep backup intact.
    # Remove old encodings sharing the same name in $dir (any video ext).
    for old in "$dir/$name."mp4 "$dir/$name."webm "$dir/$name."mov; do
      [[ -e "$old" ]] && rm -f "$old"
    done
    mv "$tmp" "$out_mp4"

    echo "  poster: $rel/$name.poster.jpg"
    ffmpeg -y -loglevel error -i "$backup_path" -frames:v 1 -q:v 4 "$poster"
  done
done

echo
echo "Done. Originals in $BACKUP (gitignored)."
du -sh "$SHOWCASE/desktop" "$SHOWCASE/mobile" "$BACKUP" 2>/dev/null || true
