"use client";

import { Product } from "@/types";
import ProductList from "@/components/product-list";
import Pagination from "@/components/pagination";

interface ProductsSectionProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  selectedCategory: string | null;
  className?: string;
}

export default function ProductsSection({
  products,
  currentPage,
  totalPages,
  selectedCategory,
  className = "",
}: ProductsSectionProps) {
  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product.id);
    // Здесь будет логика добавления в корзину
  };

  const handleQuickView = (product: Product) => {
    console.log("Quick view:", product.id);
    // Здесь будет логика быстрого просмотра
  };

  const handleToggleFavorite = (productId: number) => {
    console.log("Toggle favorite:", productId);
    // Здесь будет логика избранного
  };

  if (!products.length) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h2 className="text-xl text-gray-500">No products found</h2>
        {selectedCategory && (
          <p className="text-gray-400 mt-2">
            Try selecting a different category or clear filters
          </p>
        )}
      </div>
    );
  }

  const baseUrl = selectedCategory
    ? `/?category=${encodeURIComponent(selectedCategory)}`
    : "/";

  return (
    <div className={className}>
      <ProductList
        products={products}
        onAddToCart={handleAddToCart}
        onQuickView={handleQuickView}
        onToggleFavorite={handleToggleFavorite}
        className="mb-8"
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
        />
      )}
    </div>
  );
}
