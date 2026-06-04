type Props = {
  title: string;
  kind?: "code" | "demo" | "diagram";
  children?: React.ReactNode;
};

export function CodePlaceholder({ title, kind = "code", children }: Props) {
  const label = kind.toUpperCase();
  return (
    <figure className="mb-6 rounded-lg border border-dashed border-border bg-muted/40 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-muted-foreground">
        <span className="rounded bg-muted px-2 py-0.5">{label}</span>
        <span>{title}</span>
      </div>
      {children ? (
        <div className="text-sm text-muted-foreground">{children}</div>
      ) : (
        <div className="text-sm italic text-muted-foreground">
          Coming soon.
        </div>
      )}
    </figure>
  );
}
