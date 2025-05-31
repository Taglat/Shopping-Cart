import Link from "next/link";

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface CategoryWithCount extends Category {
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  className?: string;
  categoryCounts?: Record<string, number>;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  className = "",
  categoryCounts = {},
}: CategoryFilterProps) {
  const categoriesWithCounts: CategoryWithCount[] = categories
    .map((category) => ({
      ...category,
      count: categoryCounts[category.slug] || 0,
    }))
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count);

  const totalProducts = Object.values(categoryCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const isAllSelected = !selectedCategory;

  return (
    <div className={`pb-4 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {/* All Categories */}
        <Link
          href="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
            isAllSelected
              ? "bg-[var(--foreground)] text-[var(--background)]"
              : "bg-[var(--background)] text-[var(--foreground)]"
          }`}
        >
          <span>All Categories</span>
          {totalProducts > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs border rounded-full bg-inherit text-inherit">
              {totalProducts}
            </span>
          )}
        </Link>

        {/* Other Categories */}
        {categoriesWithCounts.map((category) => {
          const isSelected = selectedCategory === category.slug;
          return (
            <Link
              key={category.slug}
              href={`/?category=${encodeURIComponent(category.slug)}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors capitalize ${
                isSelected
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-[var(--background)] text-[var(--foreground)]"
              }`}
            >
              <span>{category.name}</span>
              <span className="ml-1 px-2 py-0.5 text-xs border rounded-full bg-inherit text-inherit">
                {category.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Filter Info */}
      {selectedCategory && (
        <div className="mt-3 text-sm">
          <span>Filtered by: </span>
          <span className="font-medium capitalize">
            {
              categoriesWithCounts.find(
                (cat) => cat.slug === selectedCategory
              )?.name || selectedCategory.replace(/-/g, " ")
            }
          </span>
          <span className="ml-1">
            (
            {
              categoriesWithCounts.find(
                (cat) => cat.slug === selectedCategory
              )?.count || 0
            }{" "}
            products)
          </span>
          <Link href="/" className="ml-2 font-bold text-blue-600 underline">
            Clear filter
          </Link>
        </div>
      )}

      {/* All categories selected - show total */}
      {!selectedCategory && (
        <div className="mt-3 text-sm">
          <span>Filtered by: </span>
          <span className="font-medium capitalize">All Categories</span>
          <span className="ml-1">({totalProducts})</span>
        </div>
      )}
    </div>
  );
}
