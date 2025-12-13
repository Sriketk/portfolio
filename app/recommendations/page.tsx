import Link from "next/link";
import { getRecommendations } from "@/lib/recommendations";

export default function Recommendations() {
  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      {recommendations.map((item, index) => (
        <div key={index} className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            <Link
              href={item.link}
              className="transition-colors hover:text-muted-foreground"
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {item.title}
            </Link>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

