import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata: Metadata = {
  title: "Work — Sriket Komali",
};

const components = {
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-base font-semibold mt-8 mb-2 text-foreground">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-base text-foreground mb-2 leading-relaxed">{children}</p>
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

export default function Work() {
  const source = fs.readFileSync(path.join(process.cwd(), "content", "work.mdx"), "utf8");
  return (
    <section className="max-w-3xl">
      <MDXRemote source={source} components={components} />
    </section>
  );
}
