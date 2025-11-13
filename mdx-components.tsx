import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-8 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 font-serif text-2xl font-semibold text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-serif text-xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-6 text-lg font-extrabold leading-relaxed text-muted-foreground">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed text-muted-foreground">
        {children}
      </li>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || '#'}
        className="text-foreground underline decoration-muted-foreground underline-offset-4 transition-colors hover:decoration-foreground"
      >
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-6 border-l-4 border-border pl-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-6 overflow-x-auto rounded-lg border border-border bg-muted p-4">
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),
    hr: () => (
      <hr className="my-8 border-border" />
    ),
    ...components,
  }
}
