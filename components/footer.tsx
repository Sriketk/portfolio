export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-8">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>© 2025 Sriket Komali</p>
        <div className="flex gap-6">
          <a href="https://github.com" className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href="https://twitter.com" className="transition-colors hover:text-foreground">
            Twitter
          </a>
          <a href="mailto:hello@example.com" className="transition-colors hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
