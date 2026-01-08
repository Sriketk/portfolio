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
  {
    title: "Chloe Zhao and Barry Jenkins DAG Hamnet Interview",
    description: "You know what. We need to pause this conversation for second. You are Chloe mf Zhao. You got statues girl",
    link: "https://youtu.be/JxK_BAOxCb0?t=1254",
  },
  {
    title: "Daniel Kwan reposted this article about authenicity, ugc, and the idea of being performative",
    description: "Need to achieve gusto. authentic is doing things cause you want to do it.",
    link: "https://apewoodx.substack.com/p/the-return-of-gusto?utm_campaign=post-expanded-share&utm_medium=post%20viewer&triedRedirect=true",
  },
  // Add more recommendations here
];

export function getRecommendations(): Recommendation[] {
  return recommendations;
}

