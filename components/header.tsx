import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-border pb-8">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-foreground">
          Sriket Komali
        </Link>
        <div className="flex gap-8 text-sm">
          <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link href="/projects" className="text-muted-foreground transition-colors hover:text-foreground">
            Projects
          </Link>
        </div>
      </nav>
    </header>
  )
}
