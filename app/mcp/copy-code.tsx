"use client";

import { useState } from "react";
import { Check, Clipboard } from "lucide-react";

export function CopyCode({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex w-full items-center gap-3 overflow-x-auto rounded-md bg-muted p-3 text-left text-xs text-foreground transition-colors hover:bg-muted/70 sm:w-auto"
      aria-label={copied ? "Copied" : "Copy command"}
    >
      <code className="flex-1">{value}</code>
      <span
        className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
        aria-hidden="true"
      >
        {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
      </span>
    </button>
  );
}
