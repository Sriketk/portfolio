import Link from "next/link";

export function Header() {
  return (
    <header className="pt-16 pb-1">
      <nav className="flex flex-col items-start gap-4">
        <Link href="/" className="text-4xl font-semibold text-foreground whitespace-nowrap">
          Sriket Komali
        </Link>
        <div className="flex gap-8 font-semibold text-md items-baseline">
          {/* <Link
            href="/thoughts"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Thoughts
          </Link> */}
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
            Recommendations
          </Link>
          <Link
            href="/guandan"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Guandan
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
