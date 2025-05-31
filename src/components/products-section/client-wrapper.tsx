"use client";

import { Product } from "@/types";
import { ProductsSection } from "./index";
import { useCart } from "@/contexts/cart-context";

interface ProductsSectionClientWrapperProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  selectedCategory: string | null;
}

export function ProductsSectionClientWrapper({
  products,
  currentPage,
  totalPages,
  selectedCategory,
}: ProductsSectionClientWrapperProps) {
  const { addToCart } = useCart();

  return (
    <ProductsSection
      products={products}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedCategory={selectedCategory}
      onAddToCart={addToCart}
    />
  );
} 