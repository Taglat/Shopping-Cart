"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { productsApi, apiUtils } from "@/services/api";
import withSkeleton from "@/components/hoc/with-skeleton";
import ProductList from "@/components/product-list";
import Pagination from "@/components/pagination";
import CategoryFilter from "@/components/filter/category-filter";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const ProductListWithSkeleton = withSkeleton(ProductList, {
  skeletonCount: 12,
});

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * pageSize;

      let data;
      if (selectedCategory) {
        data = await productsApi.getProductsByCategory(selectedCategory, {
          limit: pageSize,
          skip,
        });
      } else {
        data = await productsApi.getProducts({
          limit: pageSize,
          skip,
        });
      }

      console.log("Products fetched:", data.products);
      setProducts(data.products);
      setTotal(data.total ?? 0);
    } catch (err) {
      const errorMessage = apiUtils.handleApiError(err);
      console.error("API Error:", errorMessage, err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await productsApi.getCategories();
      console.log("Categories fetched:", data);
      if (!Array.isArray(data)) {
        console.error("Categories data is not an array:", data);
        return;
      }
      const categoryNames = Array.from(
        new Set(data.map((item: any) => item.name || item.slug || item))
      ).filter((name): name is string => typeof name === "string");
      setCategories(categoryNames);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const totalPages = Math.ceil(total / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div>
      <ThemeToggle />
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        productsApi={productsApi}
      />

      <ProductListWithSkeleton
        isLoading={loading}
        products={products}
        onAddToCart={(product) => console.log("Add to cart:", product.id)}
        onQuickView={(product) => console.log("Quick view:", product.id)}
        onToggleFavorite={(productId) =>
          console.log("Toggle favorite:", productId)
        }
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
      />
    </div>
  );
}
