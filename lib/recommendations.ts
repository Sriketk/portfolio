export type Category = "music" | "movies" | "podcasts" | "essays" | "youtube";

export const CATEGORIES: Category[] = [
  "music",
  "movies",
  "podcasts",
  "essays",
  "youtube",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  music: "Music",
  movies: "Movies",
  podcasts: "Pods/Interviews",
  essays: "Essays",
  youtube: "YouTube",
};

export type Recommendation = {
  title: string;
  description?: string;
  link?: string;
  category: Category;
};

const recommendations: Recommendation[] = [
  { title: "Boyhood", category: "movies" },
  { title: "Knight of Cups", category: "movies" },
  { title: "Mommy", category: "movies" },
  { title: "Call Me by Your Name", category: "movies" },
  { title: "Before Sunrise", category: "movies" },
  { title: "Caught Stealing", category: "movies" },
  { title: "Hard Truths", category: "movies" },
  { title: "Hamnet", category: "movies" },
  { title: "The Departed", category: "movies" },
  { title: "Black Swan", category: "movies" },
  { title: "Moonrise Kingdom", category: "movies" },
  { title: "Crossing Delancey", category: "movies" },
  { title: "Her", category: "movies" },
  { title: "Anora", category: "movies" },
  { title: "The French Connection", category: "movies" },
  { title: "The Iron Claw", category: "movies" },
  { title: "Man on Fire", category: "movies" },
  { title: "George Washington", category: "movies" },
  { title: "Oppenheimer", category: "movies" },
  { title: "Moonlight", category: "movies" },
  { title: "About Time", category: "movies" },
  { title: "The Fabelmans", category: "movies" },
  { title: "Bones and All", category: "movies" },
  { title: "Blow Out", category: "movies" },
  { title: "The Tree of Life", category: "movies" },
  { title: "Annie Hall", category: "movies" },
  { title: "Tokyo Sonata", category: "movies" },
  {
    title: "Back on 74 Music Video",
    description: "",
    link: "https://www.youtube.com/watch?v=q3lX2p_Uy9I",
    category: "youtube",
  },
  {
    title: "Apple Marketing tricks",
    description: "Really well made video. I love the Prestige parallel",
    link: "https://www.youtube.com/watch?v=9H87tHCLK1Q&list=LL&index=2",
    category: "youtube",
  },
  {
    title: "Steve Jobs Think Different speech",
    description: "Just saw this for the first time. elite.",
    link: "https://www.youtube.com/watch?v=keCwRdbwNQY",
    category: "youtube",
  },
  {
    title: "Acquired podcast business model",
    description:
      "Super interesting breakdown of the business model of one of my favorite consumer brands.",
    link: "https://www.youtube.com/watch?v=d6EMk6dyrOU",
    category: "podcasts",
  },
  {
    title: "Fred again.. Nardwuar interview",
    description: "",
    link: "https://www.youtube.com/watch?v=jsoTTMA1Kf0&t=175s",
    category: "podcasts",
  },
  {
    title: "Nolan & Cillian Murphy Video Shop",
    description: "",
    link: "https://www.youtube.com/watch?v=HLUe85q1hNM",
    category: "podcasts",
  },
  {
    title: "Washington Brothers Criterion Closet",
    description: "",
    link: "https://www.youtube.com/watch?v=-Tc0JZz6hFM",
    category: "podcasts",
  },
  {
    title: "Barry Jenkins Criterion Closet",
    description: "",
    link: "https://www.youtube.com/watch?v=R7HLpe65fHY",
    category: "podcasts",
  },
  {
    title: "Chloe Zhao and Barry Jenkins DAG Hamnet Interview",
    description:
      "You know what. We need to pause this conversation for second. You are Chloe mf Zhao. You got statues girl",
    link: "https://youtu.be/JxK_BAOxCb0?t=1254",
    category: "podcasts",
  },
  // {
  //   title:
  //     "Daniel Kwan reposted this article about authenicity, ugc, and the idea of being performative",
  //   description:
  //     "Need to achieve gusto. authentic is doing things cause you want to do it.",
  //   link: "https://apewoodx.substack.com/p/the-return-of-gusto?utm_campaign=post-expanded-share&utm_medium=post%20viewer&triedRedirect=true",
  //   category: "essays",
  // },
];

export function getRecommendations(): Recommendation[] {
  return recommendations;
}

export function getRecommendationsByCategory(): Record<Category, Recommendation[]> {
  const grouped = {
    music: [],
    movies: [],
    podcasts: [],
    essays: [],
    youtube: [],
  } as Record<Category, Recommendation[]>;
  for (const r of recommendations) grouped[r.category].push(r);
  return grouped;
}
