import { notFound } from "next/navigation"
import Link from "next/link"

// This would typically come from your MDX files or CMS
const posts: Record<string, { title: string; date: string; content: string }> = {
  "first-post": {
    title: "Getting Started with Minimal Design",
    date: "March 15, 2024",
    content: `
Minimalism in design isn't about removing everything—it's about removing everything that doesn't serve a purpose. When we strip away the unnecessary, what remains becomes more powerful and intentional.

## The Power of Whitespace

Whitespace, or negative space, is one of the most powerful tools in a designer's toolkit. It gives content room to breathe and helps guide the eye through a composition. In web design, generous whitespace can make the difference between a cluttered, overwhelming experience and one that feels calm and focused.

## Typography as a Foundation

When you embrace minimalism, typography becomes even more important. With fewer visual elements competing for attention, your choice of typefaces, sizes, and spacing carries more weight. A well-chosen serif for headings paired with a clean sans-serif for body text can create all the visual interest you need.

## Color Restraint

Minimal design often means a restrained color palette. An off-white background with dark text and perhaps one or two accent colors can be incredibly effective. This restraint forces you to be more intentional with color, using it only where it truly adds value.

## Conclusion

Minimal design is about clarity, focus, and intention. It's a discipline that requires you to question every element and ensure it serves a purpose. When done well, the result is an experience that feels effortless and timeless.
    `,
  },
  "second-post": {
    title: "Typography in Modern Web Design",
    date: "March 8, 2024",
    content: `
Typography is the foundation of web design. Before images, before animations, before any visual flourish, there are words. And how those words are presented can make or break a user's experience.

## Choosing Typefaces

The typefaces you choose set the tone for your entire design. A serif font like Crimson Pro brings elegance and readability to long-form content. A sans-serif like Inter provides clarity and modernity for UI elements and shorter text.

## Creating Hierarchy

Good typography creates a clear hierarchy that guides readers through your content. This hierarchy is established through:

- **Size**: Larger text naturally draws the eye first
- **Weight**: Bold text stands out from regular weight
- **Color**: Darker text appears more important than muted text
- **Spacing**: More space around an element gives it prominence

## Line Length and Spacing

The ideal line length for readability is typically 50-75 characters. Too short and the eye has to jump too frequently; too long and it's easy to lose your place. Line height (leading) should be around 1.5-1.6 times the font size for body text.

## Responsive Typography

Typography needs to adapt to different screen sizes. What works on desktop might be too large on mobile. Use responsive units and consider how your type scale adjusts across breakpoints.
    `,
  },
  "third-post": {
    title: "Building with Next.js and MDX",
    date: "February 28, 2024",
    content: `
MDX combines the simplicity of Markdown with the power of React components. It's perfect for building content-rich sites like blogs and documentation where you want the ease of writing in Markdown but occasionally need the flexibility of custom components.

## Why MDX?

Markdown is great for writing, but sometimes you need more than just formatted text. Maybe you want to embed an interactive chart, add a custom callout box, or include a video player. MDX lets you do all of this while keeping the writing experience simple.

## Setting Up MDX in Next.js

Next.js has excellent support for MDX through the \`@next/mdx\` package. You can configure it to work with the App Router, allowing you to create pages directly from MDX files or import MDX content into your React components.

## Custom Components

One of the best features of MDX is the ability to provide custom components for standard Markdown elements. Want all your links to open in a new tab? Want to add syntax highlighting to code blocks? You can do all of this by providing a components object.

## Content Organization

For a blog, you might organize your MDX files in a \`content/posts\` directory. Each file becomes a blog post, with frontmatter for metadata like title, date, and excerpt. You can then use Node.js file system APIs to read and parse these files at build time.
    `,
  },
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({
    slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <header className="mb-16 border-b border-border pb-8">
          <nav className="flex items-center justify-between">
            <Link href="/" className="font-serif text-xl font-semibold text-foreground">
              Your Name
            </Link>
            <div className="flex gap-8 text-sm">
              <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                About
              </Link>
              <Link href="/blog" className="text-foreground transition-colors hover:text-foreground">
                Blog
              </Link>
              <Link href="/projects" className="text-muted-foreground transition-colors hover:text-foreground">
                Projects
              </Link>
            </div>
          </nav>
        </header>

        <main>
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to blog
          </Link>

          <article>
            <header className="mb-8">
              <time className="mb-4 block text-sm text-muted-foreground">{post.date}</time>
              <h1 className="mb-4 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">
                {post.title}
              </h1>
            </header>

            <div className="prose prose-lg max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="mb-4 mt-12 font-serif text-2xl font-semibold text-foreground">
                      {paragraph.replace("## ", "")}
                    </h2>
                  )
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n")
                  return (
                    <ul key={index} className="mb-6 ml-6 list-disc space-y-2">
                      {items.map((item, i) => (
                        <li key={i} className="leading-relaxed text-muted-foreground">
                          {item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}
                        </li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={index} className="mb-6 leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </article>
        </main>

        <footer className="mt-24 border-t border-border pt-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2025 Your Name</p>
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
      </div>
    </div>
  )
}
