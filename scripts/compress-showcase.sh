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
CRF=23
PRESET=slow

mkdir -p "$BACKUP"

shopt -s nullglob nocaseglob

for dir in "$SHOWCASE/desktop" "$SHOWCASE/mobile"; do
  [[ -d "$dir" ]] || continue
  rel="${dir#$SHOWCASE/}"
  mkdir -p "$BACKUP/$rel"

  for f in "$dir"/*.mp4 "$dir"/*.webm "$dir"/*.mov; do
    [[ -e "$f" ]] || continue
    base="$(basename "$f")"
    name="${base%.*}"
    backup_path="$BACKUP/$rel/$base"
    out_mp4="$dir/$name.mp4"
    poster="$dir/$name.poster.jpg"

    # Skip if already compressed (backup exists)
    if [[ -f "$backup_path" ]]; then
      echo "skip (already compressed): $rel/$base"
      continue
    fi

    echo "compressing: $rel/$base"
    cp "$f" "$backup_path"

    tmp="$dir/.tmp.$name.mp4"
    ffmpeg -y -loglevel error -i "$backup_path" \
      -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
      -c:v libx264 -crf "$CRF" -preset "$PRESET" -pix_fmt yuv420p \
      -movflags +faststart \
      -an \
      "$tmp"

    # Replace original (delete + rename in case extension changed)
    rm -f "$f" "$out_mp4"
    mv "$tmp" "$out_mp4"

    echo "  poster: $rel/$name.poster.jpg"
    ffmpeg -y -loglevel error -i "$backup_path" -frames:v 1 -q:v 4 "$poster"
  done
done

echo
echo "Done. Originals in $BACKUP (gitignored)."
du -sh "$SHOWCASE/desktop" "$SHOWCASE/mobile" "$BACKUP" 2>/dev/null || true
