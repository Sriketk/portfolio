import { getRecommendations } from "@/lib/recommendations";
import { RecommendationsList } from "./recommendations-list";

export default function Recommendations() {
  const recommendations = getRecommendations();
  return <RecommendationsList recommendations={recommendations} />;
}
