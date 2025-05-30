import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  productsApi: any;
  className?: string;
}

interface CategoryWithCount {
  name: string;
  count: number;
}

const skeletonWidths = [100, 120, 90, 110, 95];

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  productsApi,
  className
}: CategoryFilterProps) {
  const [categoriesWithCounts, setCategoriesWithCounts] = useState<CategoryWithCount[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCategoryCounts = async () => {
    try {
      setLoading(true);

      // Fetch total product count
      const allProductsData = await productsApi.getProducts({ limit: 0 });
      setTotalCount(allProductsData.total ?? 0);

      // Fetch count for each category
      const countsPromises = categories.map(async (category) => {
        try {
          const data = await productsApi.getProductsByCategory(category, {
            limit: 0,
          });
          return {
            name: category,
            count: data.total ?? 0,
          };
        } catch (err) {
          console.error(`Failed to fetch count for category ${category}:`, err);
          return {
            name: category,
            count: 0,
          };
        }
      });

      const categoriesWithCounts = await Promise.all(countsPromises);
      setCategoriesWithCounts(categoriesWithCounts);
    } catch (err) {
      console.error("Failed to fetch category counts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      fetchCategoryCounts();
    }
  }, [categories]);

  if (loading) {
    return (
      <div className={className}>
        <div className="flex flex-wrap gap-2">
          {skeletonWidths.map((width, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-10 bg-gray-200 rounded-lg animate-pulse skeleton-item"
              style={{ width: `${width}px` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Filter out categories with zero products
  const filteredCategories = categoriesWithCounts.filter(
    (category) => category.count > 0
  );

  return (
    <div className={cn(className, "py-2")}>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            selectedCategory === null
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          All ({totalCount})
        </button>

        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === category.name
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))
        ) : (
          <div>There are no available product categories</div>
        )}
      </div>
    </div>
  );
}