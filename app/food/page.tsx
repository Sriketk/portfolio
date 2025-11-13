import Image from "next/image";
import Link from "next/link";
import { getFoodItems } from "@/lib/food";

export default function Food() {
  const foodItems = getFoodItems();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <Link
            key={item.slug}
            href={`/food/${item.slug}`}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

