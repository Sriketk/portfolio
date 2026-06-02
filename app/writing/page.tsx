import { getBlogPosts } from "@/lib/mdx"
import { WritingList } from "./writing-list"

export default async function Writing() {
  const posts = await getBlogPosts()
  return <WritingList posts={posts} />
}
