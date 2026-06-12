import Link from "next/link";

export const metadata = {
  title: "Tools",
};

const tools = [
  { href: "/tools/iphone-mockup", text: "iPhone mockup generator" },
  { href: "/guandan", text: "Guandan" },
];

export default function Page() {
  return (
    <div className="space-y-6">
      {tools.map((t) => (
        <div key={t.href} className="text-lg leading-relaxed text-foreground">
          <Link
            href={t.href}
            className="transition-colors hover:text-muted-foreground"
          >
            {t.text}
          </Link>
        </div>
      ))}
    </div>
  );
}
