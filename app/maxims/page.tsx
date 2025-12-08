import Link from "next/link";
import { getMaxims } from "@/lib/maxims";

export default function Maxims() {
  const maxims = getMaxims();

  return (
    <div className="space-y-12">
      {maxims.map((maxim, index) => (
        <div
          key={index}
          className="text-lg leading-relaxed text-foreground"
        >
          {maxim.link ? (
            <Link
              href={maxim.link}
              className="transition-colors hover:text-muted-foreground"
              target={maxim.link.startsWith("http") ? "_blank" : undefined}
              rel={maxim.link.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {maxim.text}
            </Link>
          ) : (
            maxim.text
          )}
        </div>
      ))}
    </div>
  );
}

