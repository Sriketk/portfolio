import type { Metadata } from "next";
import { headers } from "next/headers";

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

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-lg p-5 bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="font-semibold text-foreground">{title}</div>
      <div className="text-sm text-muted-foreground mb-3">{hint}</div>
      {children}
    </div>
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

function Details({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="text-sm">
      <summary className="cursor-pointer text-muted-foreground hover:text-foreground select-none">
        {summary}
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

export default async function McpPage() {
  const origin = await getOrigin();
  const url = `${origin}/api/mcp`;

  const httpConfig = JSON.stringify({ mcpServers: { sriekt: { url } } }, null, 2);
  const stdioConfig = JSON.stringify(
    { mcpServers: { sriekt: { command: "npx", args: ["-y", "mcp-remote", url] } } },
    null,
    2,
  );

  const cursorPayload = Buffer.from(JSON.stringify({ url })).toString("base64");
  const cursorDeepLink = `cursor://anysphere.cursor-deeplink/mcp/install?name=sriekt&config=${cursorPayload}`;

  const vscodePayload = encodeURIComponent(JSON.stringify({ name: "sriekt", url }));
  const vscodeDeepLink = `vscode:mcp/install?${vscodePayload}`;

  return (
    <main className="pt-8 pb-24 max-w-3xl space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">Install my MCP</h1>
        <p className="text-muted-foreground">
          Connect any AI client to my wiki — ask it about my background, decisions, projects, eras, and ideas.
        </p>
        <div className="text-xs text-muted-foreground">
          Server URL: <code className="text-foreground">{url}</code>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Quick start</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card title="Cursor" hint="One-click install">
            <div className="flex flex-col gap-2">
              <InstallButton href={cursorDeepLink} label="Add to Cursor" />
              <Details summary="Or paste manually">
                <Code>{httpConfig}</Code>
              </Details>
            </div>
          </Card>

          <Card title="VS Code" hint="One-click install">
            <div className="flex flex-col gap-2">
              <InstallButton href={vscodeDeepLink} label="Add to VS Code" />
              <Details summary="Or paste manually">
                <Code>{httpConfig}</Code>
              </Details>
            </div>
          </Card>

          <Card title="Claude Desktop" hint="See instructions">
            <Details summary="Show config">
              <p className="text-xs text-muted-foreground mb-2">
                Edit <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> and restart.
              </p>
              <Code>{stdioConfig}</Code>
            </Details>
          </Card>

          <Card title="Claude.ai (web)" hint="Custom Connector">
            <Details summary="Show steps">
              <p className="text-xs text-muted-foreground">
                Settings → Connectors → Add custom connector → paste the server URL above. Requires Pro/Team.
              </p>
            </Details>
          </Card>

          <Card title="ChatGPT" hint="Developer mode">
            <Details summary="Show steps">
              <p className="text-xs text-muted-foreground">
                Settings → Connectors → Advanced → Developer mode → Add MCP server → paste the URL.
              </p>
            </Details>
          </Card>

          <Card title="Claude Code" hint="Terminal">
            <Details summary="Show command">
              <Code>{`claude mcp add --transport http sriekt ${url}`}</Code>
            </Details>
          </Card>

          <Card title="Windsurf" hint="See instructions">
            <Details summary="Show config">
              <p className="text-xs text-muted-foreground mb-2">Settings → MCP → Add server.</p>
              <Code>{httpConfig}</Code>
            </Details>
          </Card>

          <Card title="Other clients" hint="Universal config">
            <Details summary="HTTP + stdio">
              <p className="text-xs text-muted-foreground mb-1">HTTP (Streamable):</p>
              <Code>{httpConfig}</Code>
              <p className="text-xs text-muted-foreground mt-3 mb-1">stdio bridge:</p>
              <Code>{stdioConfig}</Code>
            </Details>
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What it can do</h2>
        <p className="text-sm text-muted-foreground">
          Tools available to the connected AI:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li><code className="text-foreground">read_schema</code> — the required query workflow</li>
          <li><code className="text-foreground">get_index</code> — master catalog of articles</li>
          <li><code className="text-foreground">get_backlinks</code> — reverse-link graph</li>
          <li><code className="text-foreground">follow_wikilinks</code> — parse <code>[[links]]</code> from an article</li>
          <li><code className="text-foreground">read</code>, <code className="text-foreground">search</code>, <code className="text-foreground">tree</code>, <code className="text-foreground">list</code>, <code className="text-foreground">read_image</code> — fs primitives</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Inspiration</h2>
        <p className="text-sm text-muted-foreground">
          This wiki is built on the "personal LLM wiki" pattern — explicit, file-over-app, BYOAI. Credit where due:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>
            <a
              href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
              className="underline hover:text-foreground"
            >
              Andrej Karpathy — LLM Wiki architecture
            </a>{" "}
            (the three-layer model: raw → wiki → schema)
          </li>
          <li>
            <a
              href="https://gist.github.com/farzaa/c35ac0cfbeb957788650e36aabea836d"
              className="underline hover:text-foreground"
            >
              Farza — Farzapedia
            </a>{" "}
            (taxonomy + index + backlinks pattern this wiki follows)
          </li>
          <li>
            <a
              href="https://stephango.com/file-over-app"
              className="underline hover:text-foreground"
            >
              Steph Ango — File over app
            </a>{" "}
            (why the source-of-truth should be plain files)
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Try a prompt</h2>
        <p className="text-sm text-muted-foreground">After installing, try asking your AI:</p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>"What does Sriket's wiki say about why he left Ally Financial?"</li>
          <li>"Summarize Sriket's solo-builder era."</li>
          <li>"What are Sriket's strongest beliefs?"</li>
        </ul>
      </section>
    </main>
  );
}
