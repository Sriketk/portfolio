import Link from "next/link";

export function Header() {
  return (
    <header className="pt-16 pb-1">
      <nav className="flex flex-col items-start gap-4">
        <Link href="/" className="text-4xl font-semibold text-foreground whitespace-nowrap">
          Sriket Komali
        </Link>
        <div className="flex gap-8 font-bold text-lg items-baseline">
          <Link
            href="/writing"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Writing
          </Link>
          <Link
            href="/food"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Food
          </Link>
          <Link
            href="/maxims"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Maxims
          </Link>
          <Link
            href="/recommendations"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Recs
          </Link>
          <Link
            href="/guandan"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Guandan
          </Link>
          <Link
            href="/mcp"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            MCP
          </Link>
          {/* <Link
            href="/projects"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Projects
          </Link> */}
        </div>
      </nav>
    </header>
  );
}
