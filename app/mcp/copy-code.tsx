"use client";

export function CopyCode({ value }: { value: string }) {
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative bg-muted text-foreground rounded-md p-3 text-xs text-left overflow-x-auto hover:bg-muted/70 transition-colors w-full sm:w-auto"
      aria-label="Copy command"
    >
      <code>{value}</code>
    </button>
  );
}
