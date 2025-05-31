import { Suspense } from "react";
import { productsApi } from "@/services/api";
import { ProductsSectionClientWrapper } from "@/components/products-section/client-wrapper";
import CategoryFilter from "@/components/filter/category-filter";
import Header from "@/components/header";

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    limit?: string;
  }>;
}

interface CategoryCountResult {
  slug: string;
  count: number;
}

async function getProducts(
  page: number,
  category?: string,
  limit: number = 12
) {
  const skip = (page - 1) * limit;

  try {
    if (category) {
      return await productsApi.getProductsByCategory(category, { limit, skip });
    }
    return await productsApi.getProducts({ limit, skip });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [], total: 0 };
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const rawCategories = await productsApi.getCategories();

    // Адаптер для преобразования данных из string[] в Category[]
    if (Array.isArray(rawCategories)) {
      return rawCategories.map((categoryName: string) => ({
        slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
        name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace(/-/g, " "),
        url: `https://dummyjson.com/products/category/${categoryName}`,
      }));
    }

    // Если API вернул не массив
    console.error("API returned unexpected format for categories:", rawCategories);
    return [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

// Функция для получения количества продуктов по категориям
async function getCategoryCounts(categories: Category[]): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};

  try {
    // Получаем количество продуктов для каждой категории параллельно
    const countPromises = categories.map(async (category) => {
      try {
        const response = await productsApi.getProductsByCategory(
          category.slug,
          { limit: 1, skip: 0 }
        );
        return { slug: category.slug, count: response.total || 0 } as CategoryCountResult;
      } catch (error) {
        console.error(
          `Failed to fetch count for category ${category.slug}:`, error
        );
        return { slug: category.slug, count: 0 } as CategoryCountResult;
      }
    });

    const results = await Promise.all(countPromises);

    results.forEach(({ slug, count }) => {
      counts[slug] = count;
    });
  } catch (error) {
    console.error("Failed to fetch category counts:", error);
  }

  return counts;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const selectedCategory = params.category || null;
  const pageSize = parseInt(params.limit || "12");

  // Параллельные запросы
  const [productsData, categories] = await Promise.all([
    getProducts(currentPage, selectedCategory || undefined, pageSize),
    getCategories(),
  ]);

  // Получаем счетчики категорий
  const categoryCounts = await getCategoryCounts(categories);

  const totalPages = Math.ceil((productsData.total || 0) / pageSize);

  return (
    <div className="container mx-auto px-4">
      <Header />

      <Suspense fallback={<div>Loading filters...</div>}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          categoryCounts={categoryCounts}
          className="mb-2 mt-20"
        />
      </Suspense>

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductsSectionClientWrapper
          products={productsData.products}
          currentPage={currentPage}
          totalPages={totalPages}
          selectedCategory={selectedCategory}
        />
      </Suspense>
    </div>
  );
}
