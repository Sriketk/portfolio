import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

export const metadata: Metadata = {
  title: "CV — Sriket Komali",
};

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-3xl font-semibold mb-8">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-xl font-semibold mt-10 mb-4 border-b border-border pb-2">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-base font-semibold mt-6 mb-1 text-foreground">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-5 space-y-1 text-sm text-foreground mb-4">{children}</ul>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="text-xs text-muted-foreground not-italic">{children}</em>
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

export default function CV() {
  const source = fs.readFileSync(path.join(process.cwd(), "content", "cv.mdx"), "utf8");
  return (
    <section className="max-w-3xl">
      <MDXRemote source={source} components={components} />
    </section>
  );
}
