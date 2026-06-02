"use client"

import Link from "next/link"
import { useState } from "react"
import { WRITING_CATEGORIES, type PostMetadata, type WritingCategory } from "@/lib/writing-categories"

export function WritingList({ posts }: { posts: PostMetadata[] }) {
  const [active, setActive] = useState<WritingCategory>("All")

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-6 text-sm font-medium">
        {WRITING_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={
              active === cat
                ? "text-foreground"
                : "text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-12">
        {filtered.map((post) => (
          <article key={post.slug}>
            <Link href={`/writing/${post.slug}`} className="group block">
              <time className="mb-2 block text-md text-muted-foreground">{post.date}</time>
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
