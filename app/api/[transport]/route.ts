import { createMcpHandler } from "mcp-handler";
import path from "node:path";
import { registerWikiTools } from "@/lib/mcp/server";

const WIKI_ROOT = path.join(process.cwd(), "wiki");

const handler = createMcpHandler(
  (server) => {
    registerWikiTools(server, WIKI_ROOT);
  },
  {
    serverInfo: { name: "sriekt-wiki", version: "0.1.0" },
  },
  {
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: false,
  },
);

export { handler as GET, handler as POST, handler as DELETE };
