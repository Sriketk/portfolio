import { cn } from "@/lib/utils";

type Suit = "♠" | "♥" | "♦" | "♣" | "★";

type PlayingCard = {
  rank: string;
  suit: Suit;
};

type Props = {
  name: string;
  chinese: string;
  description: string;
  example: PlayingCard[];
  note?: string;
};

function Card({ rank, suit }: PlayingCard) {
  const red = suit === "♥" || suit === "♦";
  const joker = suit === "★";
  return (
    <div
      className={cn(
        "flex h-20 w-14 shrink-0 flex-col items-center justify-between rounded-md border border-border bg-card px-1.5 py-1.5 shadow-sm",
        red && "text-red-400",
        joker && "text-yellow-400"
      )}
    >
      <span className="text-sm font-bold leading-none">{rank}</span>
      <span className="text-2xl leading-none">{suit}</span>
      <span className="rotate-180 text-sm font-bold leading-none">{rank}</span>
    </div>
  );
}

export function GuandanCard({ name, chinese, description, example, note }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card/50 p-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <span className="text-sm text-muted-foreground">{chinese}</span>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {example.map((c, i) => (
          <Card key={i} {...c} />
        ))}
      </div>
      {note && (
        <p className="mt-3 text-xs italic text-muted-foreground">{note}</p>
      )}
    </div>
  );
}
