import type { ReactNode } from "react";

export function CodeRow({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 grid gap-4 md:grid-cols-2 lg:relative lg:left-1/2 lg:w-[min(92vw,1100px)] lg:-translate-x-1/2 [&_figure]:!mb-0">
      {children}
    </div>
  );
}
