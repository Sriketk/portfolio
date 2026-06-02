import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { WikiFs } from "./fs-tools";

export function registerWikiTools(server: McpServer, root: string) {
  const wiki = new WikiFs(root);

  server.registerTool(
    "tree",
    {
      title: "Show wiki tree",
      description:
        "Returns the directory tree of the wiki so you can see what topics exist. Call this first to discover content.",
      inputSchema: {
        maxDepth: z.number().int().min(1).max(10).optional(),
      },
    },
    async ({ maxDepth }) => ({
      content: [{ type: "text", text: await wiki.tree(maxDepth ?? 6) }],
    }),
  );

  server.registerTool(
    "list",
    {
      title: "List directory",
      description: "List files and folders inside a wiki subdirectory.",
      inputSchema: {
        path: z.string().optional().describe("Relative path; empty = root"),
      },
    },
    async ({ path: rel }) => {
      const items = await wiki.list(rel ?? "");
      return { content: [{ type: "text", text: JSON.stringify(items, null, 2) }] };
    },
  );

  server.registerTool(
    "read",
    {
      title: "Read a wiki file",
      description: "Return the full contents of a markdown/text file in the wiki.",
      inputSchema: { path: z.string().describe("Relative path to file") },
    },
    async ({ path: rel }) => ({
      content: [{ type: "text", text: await wiki.read(rel) }],
    }),
  );

  server.registerTool(
    "search",
    {
      title: "Search the wiki",
      description:
        "Case-insensitive substring search across all markdown files. Returns matching lines with paths.",
      inputSchema: {
        query: z.string().min(1),
        maxHits: z.number().int().min(1).max(200).optional(),
      },
    },
    async ({ query, maxHits }) => {
      const hits = await wiki.search(query, maxHits ?? 30);
      if (hits.length === 0) {
        return { content: [{ type: "text", text: `No matches for "${query}".` }] };
      }
      const text = hits
        .map((h) => `${h.path}:${h.line}: ${h.text}`)
        .join("\n");
      return { content: [{ type: "text", text }] };
    },
  );

  server.registerTool(
    "read_image",
    {
      title: "Read a wiki image",
      description: "Return an image file from the wiki as base64.",
      inputSchema: { path: z.string() },
    },
    async ({ path: rel }) => {
      const img = await wiki.readImage(rel);
      return {
        content: [{ type: "image", data: img.base64, mimeType: img.mimeType }],
      };
    },
  );
}
