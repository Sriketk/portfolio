import type { Metadata } from "next";
import { headers } from "next/headers";
import { CopyCode } from "./copy-code";

export const metadata: Metadata = {
  title: "MCP — Sriket Komali",
  description: "Install Sriket's MCP server in any AI client.",
};

async function getOrigin() {
  const h = await headers();
  const host = h.get("host") ?? "sriket.com";
  const proto = h.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-muted text-foreground rounded-md p-3 overflow-x-auto text-xs">
      <code>{children}</code>
    </pre>
  );
}

function InstallButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
    >
      {label}
    </a>
  );
}

export default async function McpPage() {
  const origin = await getOrigin();
  const url = `${origin}/api/mcp`;

  const cursorPayload = Buffer.from(JSON.stringify({ url })).toString("base64");
  const cursorDeepLink = `cursor://anysphere.cursor-deeplink/mcp/install?name=sriket&config=${cursorPayload}`;

  return (
    <main className="pt-8 pb-24 max-w-3xl space-y-8">
      <section className="space-y-3">
        <h1 className="text-xl font-semibold">Install MCP and ask anything</h1>
        <div className="text-xs text-muted-foreground">
          Server URL: <code className="text-foreground">{url}</code>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Quick start</h2>
        <ul className="divide-y divide-border border-y border-border">
          <li className="py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold text-foreground">Claude Code</div>
              <div className="text-sm text-muted-foreground">Terminal</div>
            </div>
            <CopyCode value={`claude mcp add --transport http sriket ${url}`} />
          </li>
          <li className="py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold text-foreground">Cursor</div>
              <div className="text-sm text-muted-foreground">One-click install</div>
            </div>
            <InstallButton href={cursorDeepLink} label="Add to Cursor" />
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Inspired by{" "}
          <a
            href="https://x.com/FarzaTV/status/2040563939797504467"
            className="underline hover:text-foreground"
          >
            Farza's tweet
          </a>
          .
        </p>
      </section>

    </main>
  );
}
