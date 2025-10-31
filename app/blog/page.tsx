import Link from "next/link"

const posts = [
  {
    slug: "first-post",
    title: "Getting Started with Minimal Design",
    date: "March 15, 2024",
    excerpt:
      "Exploring the principles of minimalism in web design and how less can truly be more when it comes to creating impactful user experiences.",
  },
  {
    slug: "second-post",
    title: "Typography in Modern Web Design",
    date: "March 8, 2024",
    excerpt:
      "A deep dive into choosing the right typefaces and creating hierarchy that guides readers through your content naturally.",
  },
  {
    slug: "third-post",
    title: "Building with Next.js and MDX",
    date: "February 28, 2024",
    excerpt: "How to set up a blog using MDX for rich content authoring while maintaining the simplicity of markdown.",
  },
]

export default function Blog() {
  return (
    <>
      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <time className="mb-2 block text-sm text-muted-foreground">{post.date}</time>
              <h2 className="mb-3 text-2xl font-semibold text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </>
  )
}
