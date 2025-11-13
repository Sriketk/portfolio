import Link from "next/link";

export function Header() {
  return (
    <header className="pt-16 pb-1">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-4xl font-semibold text-foreground">
          Sriket Komali
        </Link>
        <div className="flex gap-8 font-semibold text-md">
          <Link
            href="/thoughts"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Thoughts
          </Link>
          <Link
            href="/food"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Food
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
