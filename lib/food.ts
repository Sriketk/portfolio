export type FoodItem = {
  slug: string;
  title: string;
  image: string;
  description: string;
};

const foodItems: FoodItem[] = [
  {
    slug: "pasta",
    title: "Pasta",
    image: "/pasta.png",
    description:
      "Spicy vodka pasta with sundried tomatoes and olive oil, topped with with parmesan reggiano"
  },
  {
    slug: "taco",
    title: "Taco",
    image: "/taco.png",
    description:
      "A blue corn tortilla with oven-roasted sweet potato, purple cabbage slaw, elote, black beans topped with pickled jalapeños and a cilanto-avacado crema",
  },
  {
    slug: "paneer-curry",
    title: "Paneer Curry",
    image: "/paneer.png",
    description:
      "Cubed up paneer in a slow-roasted tomato and caramelized onion sauce topped with fresh cream and cilantro",
  },
  {
    slug: "sub",
    title: "Sub",
    image: "/sub.png",
    description:
      "Sweet and sour stripped tempeh with home made pickles, purple cabbage slaw, and pepperjack cheese topped with chipotle mayonnaise on garlic focaccia ",
  },
];

export function getFoodItems(): FoodItem[] {
  return foodItems;
}

export function getFoodItem(slug: string): FoodItem | undefined {
  return foodItems.find((item) => item.slug === slug);
}

