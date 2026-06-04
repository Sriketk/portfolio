import { GuandanCard } from "@/components/guandan-card";

const hands = [
  {
    name: "Single",
    description: "One card. Lowest combination.",
    example: [{ rank: "7", suit: "♠" as const }],
  },
  {
    name: "Pair",
    description: "Two cards of the same rank.",
    example: [
      { rank: "9", suit: "♥" as const },
      { rank: "9", suit: "♣" as const },
    ],
  },
  {
    name: "Triple",
    description: "Three cards of the same rank.",
    example: [
      { rank: "J", suit: "♠" as const },
      { rank: "J", suit: "♥" as const },
      { rank: "J", suit: "♦" as const },
    ],
  },
  {
    name: "Full House",
    description: "Triple plus a pair. Compared by rank of the triple.",
    example: [
      { rank: "K", suit: "♠" as const },
      { rank: "K", suit: "♥" as const },
      { rank: "K", suit: "♣" as const },
      { rank: "5", suit: "♦" as const },
      { rank: "5", suit: "♠" as const },
    ],
  },
  {
    name: "Straight",
    description:
      "Five consecutive cards. Suits can mix. A-2-3-4-5 lowest, 10-J-Q-K-A highest.",
    example: [
      { rank: "5", suit: "♠" as const },
      { rank: "6", suit: "♥" as const },
      { rank: "7", suit: "♦" as const },
      { rank: "8", suit: "♣" as const },
      { rank: "9", suit: "♠" as const },
    ],
  },
  {
    name: "Tube",
    description: "Three consecutive pairs.",
    example: [
      { rank: "7", suit: "♠" as const },
      { rank: "7", suit: "♥" as const },
      { rank: "8", suit: "♦" as const },
      { rank: "8", suit: "♣" as const },
      { rank: "9", suit: "♠" as const },
      { rank: "9", suit: "♥" as const },
    ],
  },
  {
    name: "Plate",
    description: "Two consecutive triples.",
    example: [
      { rank: "6", suit: "♠" as const },
      { rank: "6", suit: "♥" as const },
      { rank: "6", suit: "♦" as const },
      { rank: "7", suit: "♣" as const },
      { rank: "7", suit: "♠" as const },
      { rank: "7", suit: "♥" as const },
    ],
  },
  {
    name: "Bomb",
    description: (
      <>
        Four or <strong className="font-bold text-foreground">MORE</strong>{" "}
        cards of the same rank. Beats any non-bomb. Larger bombs beat smaller
        bombs.
      </>
    ),
    example: [
      { rank: "Q", suit: "♠" as const },
      { rank: "Q", suit: "♥" as const },
      { rank: "Q", suit: "♦" as const },
      { rank: "Q", suit: "♣" as const },
    ],
  },
  {
    name: "Straight Flush",
    description:
      "Five consecutive cards of the same suit. Ranks between a 5-bomb and a 6-bomb.",
    example: [
      { rank: "8", suit: "♥" as const },
      { rank: "9", suit: "♥" as const },
      { rank: "10", suit: "♥" as const },
      { rank: "J", suit: "♥" as const },
      { rank: "Q", suit: "♥" as const },
    ],
  },
  {
    name: "Joker Bomb",
    description: "Two big jokers + two small jokers. Beats everything.",
    example: [
      { rank: "BJ", suit: "★" as const },
      { rank: "BJ", suit: "★" as const },
      { rank: "SJ", suit: "★" as const },
      { rank: "SJ", suit: "★" as const },
    ],
    note: "Unbeatable.",
  },
];

export default function GuandanPage() {
  return (
    <div className="space-y-8">
      <div className="sm:relative sm:left-1/2 sm:right-1/2 sm:-ml-[50vw] sm:-mr-[50vw] sm:w-screen sm:px-12">
        <h1 className="mb-2 text-xl font-semibold text-foreground">
          Guandan Hands
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Cant find a visual representation of guandan hands online. made for my
          friends and I.
        </p>
      </div>
      <div className="grid auto-rows-fr grid-cols-2 justify-center gap-2 sm:relative sm:left-1/2 sm:right-1/2 sm:-ml-[50vw] sm:-mr-[50vw] sm:w-screen sm:grid-cols-[repeat(auto-fit,minmax(20rem,20rem))] sm:justify-start sm:gap-4 sm:px-12">
        {hands.map((h) => (
          <GuandanCard key={h.name} {...h} />
        ))}
      </div>
    </div>
  );
}
