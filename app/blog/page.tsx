import Link from "next/link"
import { getBlogPosts } from "@/lib/mdx"

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <>
      <div className="space-y-12">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <time className="mb-2 block text-sm text-muted-foreground">{post.date}</time>
              <h2 className="mb-3 text-xl font-semibold text-foreground transition-colors ">
                {post.title}
              </h2>
             
            </Link>
          </article>
        ))}
      </div>
    </>
  )
}
