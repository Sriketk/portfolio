import { promises as fs } from "node:fs";
import path from "node:path";

const TEXT_EXT = new Set([".md", ".mdx", ".txt", ".markdown"]);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);
const SKIP_DIR = new Set(["node_modules", ".git", ".next", "dist", ".vercel"]);

export class WikiFs {
  constructor(public root: string) {}

  private resolveSafe(rel: string): string {
    const target = path.resolve(this.root, rel);
    if (target !== this.root && !target.startsWith(this.root + path.sep)) {
      throw new Error(`Path escapes wiki root: ${rel}`);
    }
    return target;
  }

  async tree(maxDepth = 6): Promise<string> {
    const lines: string[] = [path.basename(this.root) + "/"];
    const walk = async (dir: string, prefix: string, depth: number) => {
      if (depth > maxDepth) return;
      let entries;
      try {
        entries = await fs.readdir(dir, { withFileTypes: true });
      } catch {
        return;
      }
      entries = entries
        .filter((e) => !e.name.startsWith(".") && !SKIP_DIR.has(e.name))
        .sort((a, b) => a.name.localeCompare(b.name));
      for (let i = 0; i < entries.length; i++) {
        const e = entries[i];
        const last = i === entries.length - 1;
        const branch = last ? "└── " : "├── ";
        lines.push(prefix + branch + e.name + (e.isDirectory() ? "/" : ""));
        if (e.isDirectory()) {
          await walk(
            path.join(dir, e.name),
            prefix + (last ? "    " : "│   "),
            depth + 1,
          );
        }
      }
    };
    await walk(this.root, "", 1);
    return lines.join("\n");
  }

  async list(rel = ""): Promise<Array<{ name: string; type: "file" | "dir"; path: string }>> {
    const dir = this.resolveSafe(rel);
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => !e.name.startsWith(".") && !SKIP_DIR.has(e.name))
      .map((e) => ({
        name: e.name,
        type: e.isDirectory() ? ("dir" as const) : ("file" as const),
        path: path.relative(this.root, path.join(dir, e.name)),
      }));
  }

  async read(rel: string): Promise<string> {
    const target = this.resolveSafe(rel);
    return fs.readFile(target, "utf-8");
  }

  async readImage(rel: string): Promise<{ base64: string; mimeType: string }> {
    const target = this.resolveSafe(rel);
    const ext = path.extname(target).toLowerCase();
    if (!IMAGE_EXT.has(ext)) throw new Error(`Not an image: ${rel}`);
    const buf = await fs.readFile(target);
    const mimeType =
      ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".png"
          ? "image/png"
          : ext === ".gif"
            ? "image/gif"
            : "image/webp";
    return { base64: buf.toString("base64"), mimeType };
  }

  async search(
    query: string,
    maxHits = 30,
  ): Promise<Array<{ path: string; line: number; text: string }>> {
    const q = query.toLowerCase();
    const hits: Array<{ path: string; line: number; text: string }> = [];
    const walk = async (dir: string) => {
      if (hits.length >= maxHits) return;
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const e of entries) {
        if (hits.length >= maxHits) return;
        if (e.name.startsWith(".") || SKIP_DIR.has(e.name)) continue;
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          await walk(full);
        } else if (TEXT_EXT.has(path.extname(e.name).toLowerCase())) {
          let content: string;
          try {
            content = await fs.readFile(full, "utf-8");
          } catch {
            continue;
          }
          const lines = content.split("\n");
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes(q)) {
              hits.push({
                path: path.relative(this.root, full),
                line: i + 1,
                text: lines[i].trim().slice(0, 240),
              });
              if (hits.length >= maxHits) return;
            }
          }
        }
      }
    };
    await walk(this.root);
    return hits;
  }
}
