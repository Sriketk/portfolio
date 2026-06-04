import Link from "next/link";

export function Header() {
  return (
    <header className="pt-16 pb-1">
      <nav className="flex flex-col items-start gap-4">
        <Link href="/" className="text-2xl md:text-4xl font-semibold text-foreground whitespace-nowrap">
          Sriket Komali
        </Link>
        <div className="flex gap-3 font-bold text-xs md:text-lg md:gap-8 items-baseline">
          <Link
            href="/cv"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            CV
          </Link>
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
