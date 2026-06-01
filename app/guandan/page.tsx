import { GuandanCard } from "@/components/guandan-card";

const hands = [
  {
    name: "Single",
    chinese: "单张",
    description: "One card. Lowest combination.",
    example: [{ rank: "7", suit: "♠" as const }],
  },
  {
    name: "Pair",
    chinese: "对子",
    description: "Two cards of the same rank.",
    example: [
      { rank: "9", suit: "♥" as const },
      { rank: "9", suit: "♣" as const },
    ],
  },
  {
    name: "Triple",
    chinese: "三同张",
    description: "Three cards of the same rank.",
    example: [
      { rank: "J", suit: "♠" as const },
      { rank: "J", suit: "♥" as const },
      { rank: "J", suit: "♦" as const },
    ],
  },
  {
    name: "Full House",
    chinese: "三带二 (夯)",
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
    chinese: "顺子",
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
    chinese: "连对 (木板)",
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
    chinese: "钢板",
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
    chinese: "炸弹",
    description:
      "Four or more cards of the same rank. Beats any non-bomb. Larger bombs beat smaller bombs.",
    example: [
      { rank: "Q", suit: "♠" as const },
      { rank: "Q", suit: "♥" as const },
      { rank: "Q", suit: "♦" as const },
      { rank: "Q", suit: "♣" as const },
    ],
  },
  {
    name: "Straight Flush",
    chinese: "同花顺",
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
    chinese: "天王炸",
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
      <div>
        <h1 className="mb-2 text-3xl font-semibold text-foreground">
          Guandan Hands
        </h1>
        <p className="text-muted-foreground">
          掼蛋 — a four-player Chinese trick-taking game. Reference for all
          legal combinations, ordered from weakest to strongest.
        </p>
      </div>
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex w-screen flex-wrap justify-center gap-4 px-6">
        {hands.map((h) => (
          <div key={h.name} className="w-80">
            <GuandanCard {...h} />
          </div>
        ))}
      </div>
    </div>
  );
}
