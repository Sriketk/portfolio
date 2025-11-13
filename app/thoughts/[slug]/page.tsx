import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({});

  return (
    <>
      

      <article>
        <header>
          <time className="mb-4 block text-md text-muted-foreground">
            {post.metadata.date}
          </time>
          <h1 className="mb-4 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            {post.metadata.title}
          </h1>
        </header>

        <div className="max-w-none">
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                      keepBackground: false,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
    </>
  );
}
