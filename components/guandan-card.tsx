import { cn } from "@/lib/utils";

type Suit = "♠" | "♥" | "♦" | "♣" | "★";

type PlayingCard = {
  rank: string;
  suit: Suit;
};

type Props = {
  name: string;
  description: React.ReactNode;
  example: PlayingCard[];
  note?: string;
};

function Card({ rank, suit }: PlayingCard) {
  const red = suit === "♥" || suit === "♦";
  const joker = suit === "★";
  return (
    <div
      className={cn(
        "flex h-12 w-8 shrink-0 flex-col items-center justify-between rounded-md border border-border bg-card px-1 py-1 shadow-sm sm:h-20 sm:w-14 sm:px-1.5 sm:py-1.5",
        red && "text-red-400",
        joker && "text-yellow-400"
      )}
    >
      <span className="text-[10px] font-bold leading-none sm:text-sm">{rank}</span>
      <span className="text-base leading-none sm:text-2xl">{suit}</span>
      <span className="rotate-180 text-[10px] font-bold leading-none sm:text-sm">{rank}</span>
    </div>
  );
}

export function GuandanCard({ name, description, example, note }: Props) {
  return (
    <div className="flex w-full flex-col rounded-lg border border-border bg-card/50 p-2 sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground sm:text-lg">{name}</h3>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {example.map((c, i) => (
          <Card key={i} {...c} />
        ))}
      </div>
      <p className="mt-auto text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {description}
      </p>
      {note && (
        <p className="mt-3 text-xs italic text-muted-foreground">{note}</p>
      )}
    </div>
  );
}
