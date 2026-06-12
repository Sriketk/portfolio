export type Category = "music" | "movies" | "podcasts" | "youtube";

export const CATEGORIES: Category[] = [
  "music",
  "movies",
  "podcasts",
  "youtube",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  music: "Music",
  movies: "Movies",
  podcasts: "Pods/Interviews",
  youtube: "YouTube",
};

export type Recommendation = {
  title: string;
  description?: string;
  link?: string;
  category: Category;
  artist?: string;
  apple?: string;
};

const recommendations: Recommendation[] = [
  { title: "For Me", artist: "Asal", category: "music", apple: "https://music.apple.com/us/album/for-me-single/1742270886" },
  { title: "The Man Who Sold the World", artist: "Nirvana", category: "music" },
  { title: "Why I Do It", artist: "August Alsina & Lil Wayne", category: "music", apple: "https://music.apple.com/us/album/why-i-do-it-feat-lil-wayne/1445038132?i=1445038148" },
  { title: "B.L.O.W.", artist: "Tory Lanez", category: "music" },
  { title: "Tourist", artist: "Travis Scott", category: "music", apple: "https://music.apple.com/us/album/tourist-feat-travis-scott-lil-wayne/1127989414?i=1127989707" },
  { title: "To Dream", artist: "Tory Lanez", category: "music" },
  { title: "Loner Blvd", artist: "Tory Lanez", category: "music" },
  { title: "Crazy Brazy", artist: "A$AP Mob", category: "music" },
  { title: "Chilli Peppers", artist: "Roy Woods", category: "music" },
  { title: "blkswn", artist: "Smino", category: "music" },
  { title: "Playboy", artist: "Tyga", category: "music" },
  { title: "Feels So Good", artist: "A$AP Mob", category: "music" },
  { title: "Fashion", artist: "Jay Critch", category: "music", apple: "https://music.apple.com/us/album/fashion-feat-rich-the-kid/1444901263?i=1444901268" },
  { title: "Lonely", artist: "Speaker Knockerz", category: "music" },
  { title: "Booty", artist: "Blac Youngsta", category: "music" },
  { title: "Bed Bugs", artist: "Carnage", category: "music" },
  { title: "Trip", artist: "Brockhampton", category: "music", apple: "https://music.apple.com/us/album/trip/1245319817?i=1245319878" },
  { title: "White Girls", artist: "Belly", category: "music" },
  { title: "Mutual Butterflies", artist: "Ryan Trey", category: "music", apple: "https://music.apple.com/us/album/mutual-butterflies/1434657568?i=1434657572" },
  { title: "Granada", artist: "Vice Menta", category: "music", apple: "https://music.apple.com/us/album/granada/1435942054?i=1435942057" },
  { title: "Time", artist: "Lil Baby", category: "music" },
  { title: "Calvin Cambridge", artist: "SOB X RBE", category: "music" },
  { title: "Iced Out Gold Chain", artist: "GupaDad 4000", category: "music", apple: "https://music.apple.com/us/album/iced-out-gold-chain/1737342579?i=1737342768" },
  { title: "Walk in the Park", artist: "Jack Harlow", category: "music" },
  { title: "4 Letter Word", artist: "Ant Clemons", category: "music" },
  { title: "One Day", artist: "Tory Lanez", category: "music" },
  { title: "Cha", artist: "Laundry Day", category: "music" },
  { title: "Creme", artist: "Laundry Day", category: "music" },
  { title: "Tomorrow", artist: "Jorja Smith", category: "music" },
  { title: "Do That", artist: "Sheck Wes", category: "music" },
  { title: "Bank", artist: "Lil Baby", category: "music" },
  { title: "Tied Up", artist: "Ama Lou", category: "music", apple: "https://music.apple.com/us/album/tried-up/1520082317?i=1520082318" },
  { title: "Play Too Much", artist: "Kyle Dion", category: "music" },
  { title: "Falling", artist: "Che Ecru", category: "music" },
  { title: "Dante's Creek", artist: "THEY.", category: "music" },
  { title: "Count Me In", artist: "THEY.", category: "music", apple: "https://music.apple.com/us/album/count-me-in/1514318958?i=1514318960" },
  { title: "Lightyear", artist: "Kyle Lux", category: "music" },
  { title: "Under Armor", artist: "Beam", category: "music" },
  { title: "Jump", artist: "Lonr.", category: "music" },
  { title: "Brown", artist: "Kyle Dion", category: "music" },
  { title: "Misunderstood", artist: "Lucky Daye", category: "music" },
  { title: "This Woman's Work", artist: "Zacari", category: "music" },
  { title: "Hollywood Love", artist: "Achal", category: "music" },
  { title: "Time In", artist: "TWENTY88", category: "music" },
  { title: "Hero", artist: "Pivot Gang", category: "music", apple: "https://music.apple.com/us/album/hero/1458438060?i=1458438068" },
  { title: "Lately", artist: "Celeste", category: "music" },
  { title: "Rose in Harlem", artist: "Teyana Taylor", category: "music" },
  { title: "Heavy Metal", artist: "Paris Texas", category: "music" },
  { title: "Big Talk", artist: "Marco Luka", category: "music" },
  { title: "Paradise", artist: "Marco Luka", category: "music", apple: "https://music.apple.com/us/album/paradise/1528670100?i=1528670101" },
  { title: "Ford Cardinal", artist: "Halima", category: "music", apple: "https://music.apple.com/us/album/ford-cardinal/1672485122?i=1672485123" },
  { title: "De La Hoya", artist: "Don Toliver", category: "music", apple: "https://music.apple.com/us/album/de-la-hoya/1508004642?i=1508004662" },
  { title: "Freedom", artist: "Justin Bieber", category: "music", apple: "https://music.apple.com/us/album/freedom/1561541743?i=1561541752" },
  { title: "Cellophane", artist: "Emeryld", category: "music", apple: "https://music.apple.com/us/album/cellophane/1738285059?i=1738285064" },
  { title: "Boom!", artist: "Lil Yachty", category: "music", apple: "https://music.apple.com/us/album/boom-feat-ugly-god/1355203148?i=1355203527" },
  { title: "Weekend", artist: "Jorja Smith", category: "music", apple: "https://music.apple.com/us/album/weekend/1563007618?i=1563008015" },
  { title: "Take Me Home", artist: "Vince Staples", category: "music", apple: "https://music.apple.com/us/album/take-me-home/1573959840?i=1573960361" },
  { title: "Hear Me Clearly", artist: "Nigo", category: "music", apple: "https://music.apple.com/us/album/hear-me-clearly/1620082258?i=1620082943" },
  { title: "Skin and Bones", artist: "070 Shake", category: "music", apple: "https://music.apple.com/us/album/skin-and-bones/1622288641?i=1622289307" },
  { title: "Blue", artist: "The Neighbourhood", category: "music", apple: "https://music.apple.com/us/album/blue/1440532502?i=1440532811" },
  { title: "Functional Addict", artist: "Nigo", category: "music", apple: "https://music.apple.com/us/album/functional-addict/1836436236?i=1836436573" },
  { title: "Louie Bag", artist: "YEBBA", category: "music", apple: "https://music.apple.com/us/album/louie-bag-feat-smino/1582539407?i=1582539803" },
  { title: "Modennaminute", artist: "Smino", category: "music", apple: "https://music.apple.com/us/album/modennaminute/1650481396?i=1650481410" },
  { title: "Time", artist: "Jorja Smith", category: "music" },
  { title: "Drop Top Lexus", artist: "Big Baby Gucci", category: "music", apple: "https://music.apple.com/us/album/drop-top-lexus/1536799776?i=1536799786" },
  { title: "Blood on the Asphalt", artist: "Big Baby Gucci", category: "music", apple: "https://music.apple.com/us/album/blood-on-the-asphalt/1540867781?i=1540867782" },
  { title: "White Crocs", artist: "Jordan Ward", category: "music", apple: "https://music.apple.com/us/album/white-crocs/1666749387?i=1666749895" },
  { title: "Back on 74", artist: "Jungle", category: "music", apple: "https://music.apple.com/us/album/back-on-74/1676151993?i=1676152328" },
  { title: "Redeye", artist: "Cyber Trash", category: "music", apple: "https://music.apple.com/us/album/redeye-demo/1713203745?i=1713203872" },
  { title: "Hunger", artist: "MIKE", category: "music", apple: "https://music.apple.com/us/album/hunger/1618857612?i=1618857616" },
  { title: "Sentry", artist: "MIKE", category: "music", apple: "https://music.apple.com/us/album/sentry-feat-mike/1706552054?i=1706552451" },
  { title: "Hold My Heart", artist: "Eric Reprid", category: "music", apple: "https://music.apple.com/us/album/hold-my-heart/1708358608?i=1708358750" },
  { title: "Night Fever", artist: "Jonah Zed", category: "music", apple: "https://music.apple.com/us/album/night-fever/1608617722?i=1608617723" },
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
    title: "PS Imma be a star",
    description: "Required Text. Please watch this",
    link: "https://www.youtube.com/watch?v=LMBQJkwpkqo",
    category: "youtube",
  },
  {
    title: "Back on 74 Music Video",
    description: "watching dance for design inspiration is so underrated. the one shot, the musicality, the texture. insane",
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
    title: "Jared Mcain Documentary",
    description: "grinding hoops in college cause of this",
    link: "https://www.youtube.com/watch?v=F5s2J7uatp0",
    category: "youtube",
  },
  {
    title: "Round 2",
    description: "im still yet to hit the cali dap.",
    link: "https://www.youtube.com/watch?v=wZe7N0dJArc",
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
    title: "Tyler, the Creator interview",
    description: "",
    link: "https://www.youtube.com/watch?v=Z90f1-zWg0c",
    category: "podcasts",
  },
  {
    title: "Chloe Zhao and Barry Jenkins DAG Hamnet Interview",
    description:
      "You know what. We need to pause this conversation for second. You are Chloe mf Zhao. You got statues girl",
    link: "https://youtu.be/JxK_BAOxCb0?t=1254",
    category: "podcasts",
  },
];

export function getRecommendations(): Recommendation[] {
  return recommendations;
}

export function getRecommendationsByCategory(): Record<Category, Recommendation[]> {
  const grouped = {
    music: [],
    movies: [],
    podcasts: [],
    youtube: [],
  } as Record<Category, Recommendation[]>;
  for (const r of recommendations) grouped[r.category].push(r);
  return grouped;
}
