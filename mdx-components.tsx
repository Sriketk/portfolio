import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { CodePlaceholder } from '@/components/code-placeholder'
import { CodeRow } from '@/components/code-row'
import { Caption, Video, YouTube } from '@/components/media'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    CodePlaceholder,
    CodeRow,
    Caption,
    Video,
    YouTube,
    h1: ({ children }) => (
      <h1 className="mb-8 text-4xl font-semibold leading-tight text-foreground md:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-12 text-2xl font-semibold text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-6 text-lg font-semibold leading-relaxed text-muted-foreground">
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
    code: ({ children, className, ...props }) => {
      const isBlock = "data-language" in props || (className ?? "").includes("language-");
      return (
        <code
          className={
            isBlock
              ? `font-mono text-sm ${className ?? ""}`
              : `rounded bg-muted px-1.5 py-0.5 font-mono text-sm ${className ?? ""}`
          }
          {...props}
        >
          {children}
        </code>
      );
    },
    figure: ({ children, ...props }: any) => {
      const isCode = "data-rehype-pretty-code-figure" in props;
      if (!isCode) return <figure {...props}>{children}</figure>;
      return (
        <figure
          {...props}
          className="mb-6 overflow-hidden rounded-xl border border-border bg-muted"
        >
          {children}
        </figure>
      );
    },
    figcaption: ({ children, ...props }: any) => {
      const isTitle = "data-rehype-pretty-code-title" in props;
      if (!isTitle) return <figcaption {...props}>{children}</figcaption>;
      return (
        <figcaption
          {...props}
          className="flex items-center gap-3 border-b border-border bg-black/30 px-3 py-2 font-mono text-xs text-muted-foreground"
        >
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </span>
          <span>{children}</span>
        </figcaption>
      );
    },
    pre: ({ children, className, ...props }: any) => {
      const insideFigure = "data-language" in props;
      return (
        <pre
          className={
            insideFigure
              ? `overflow-x-auto py-3 px-2 ${className ?? ""}`
              : `mb-6 overflow-x-auto rounded-lg border border-border bg-muted py-3 px-2 ${className ?? ""}`
          }
          {...props}
        >
          {children}
        </pre>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),
    img: ({ src, alt }: any) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="mb-6 w-full rounded-xl border border-border"
      />
    ),
    hr: () => (
      <hr className="my-8 border-border" />
    ),
    ...components,
  }
}
