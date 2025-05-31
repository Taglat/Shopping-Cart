"use client";

import { Product } from "@/types";
import { ProductDetail } from "./index";
import { useCart } from "@/contexts/cart-context";

interface ProductDetailClientWrapperProps {
  product: Product;
}

export function ProductDetailClientWrapper({
  product,
}: ProductDetailClientWrapperProps) {
  const { addToCart } = useCart();

  return <ProductDetail product={product} onAddToCart={addToCart} />;
} 