import fs from "fs";
import path from "path";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-lg leading-relaxed text-foreground mb-6">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    const external = href?.startsWith("http");
    return (
      <Link
        href={href || "#"}
        className="underline"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  },
};

export default function Home() {
  const source = fs.readFileSync(
    path.join(process.cwd(), "content", "home.mdx"),
    "utf8"
  );

  return (
    <section className="mb-12">
      <div className="space-y-6">
        <MDXRemote source={source} components={components} />
      </div>
    </section>
  );
}
