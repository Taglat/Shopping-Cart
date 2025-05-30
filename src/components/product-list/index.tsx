import React from "react";
import { Product } from "@/types";
import ProductItem from "../product-item"; 

interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleFavorite?: (productId: number) => void;
  favoriteIds?: number[];
  className?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleFavorite,
  favoriteIds = [],
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
    >
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favoriteIds.includes(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
