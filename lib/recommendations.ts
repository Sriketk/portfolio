export type Recommendation = {
  title: string;
  description: string;
  link: string;
};

const recommendations: Recommendation[] = [
  {
    title: "Apple Marketing tricks",
    description: "Really well made video. I love the Prestige parallel",
    link: "https://www.youtube.com/watch?v=9H87tHCLK1Q&list=LL&index=2",
  },

  {
    title: "Steve Jobs Think Different speech",
    description: "Just saw this for the first time. elite.",
    link: "https://www.youtube.com/watch?v=keCwRdbwNQY",
  },
  {
    title: "Acquired podcast business model",
    description: "Super interesting breakdown of the business model of one of my favorite consumer brands.",
    link: "https://www.youtube.com/watch?v=d6EMk6dyrOU",
  },
  // Add more recommendations here
];

export function getRecommendations(): Recommendation[] {
  return recommendations;
}

