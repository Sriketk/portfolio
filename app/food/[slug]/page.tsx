import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getFoodItem, getFoodItems } from "@/lib/food";

export async function generateStaticParams() {
  const items = getFoodItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function FoodDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getFoodItem(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <Link
        href="/food"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to food
      </Link>

      <article className="space-y-6">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-foreground">
            {item.description}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl">
            <Image
              src={item.image}
              alt={item.title}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </article>
    </>
  );
}

