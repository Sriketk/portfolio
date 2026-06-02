#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import path from "node:path";
import { registerWikiTools } from "../lib/mcp/server";

async function main() {
  const rootArg = process.argv[2];
  if (!rootArg) {
    console.error("Usage: wiki-mcp <path-to-wiki-dir>");
    process.exit(1);
  }
  const root = path.resolve(rootArg);

  const server = new McpServer({ name: "sriekt-wiki", version: "0.1.0" });
  registerWikiTools(server, root);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`sriekt-wiki MCP running on stdio (root: ${root})`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
