import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import ProductImage from "./ui/product-image";
import PriceDisplay from "./ui/price-display";
import ProductRating from "./ui/product-rating";
import AddToCartButton from "./ui/add-to-cart-button";
import ProductBadge from "./ui/product-badge";

interface ProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onAddToCart,
  className = "",
}) => {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;
  const isInStock = product.stock > 0;

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div
      className={`group relative rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border hover:border-opacity-50 flex flex-col ${className}`}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {hasDiscount && (
          <ProductBadge
            className="border text-[var(--foreground)] bg-[var(--background)]"
            type="discount"
            value={product.discountPercentage}
          />
        )}
        {!isInStock && <ProductBadge type="out-of-stock" />}
      </div>

      {/* Кликабельная область для перехода на страницу продукта */}
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <ProductImage
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            {/* Brand */}
            <div className="h-5 mb-1">
              {product.brand && (
                <p className="text-sm opacity-70">{product.brand}</p>
              )}
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium line-clamp-2 mb-2 h-10">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="mb-2">
              <ProductRating rating={product.rating} />
            </div>

            {/* Price */}
            <div className="mb-3">
              <PriceDisplay
                price={hasDiscount ? discountedPrice : product.price}
                originalPrice={hasDiscount ? product.price : undefined}
                currency="$"
              />
            </div>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - вне Link для предотвращения конфликта */}
      <div className="px-4 pb-4">
        <AddToCartButton
          onClick={handleAddToCart}
          className="w-full border text-gray-900 dark:text-gray-100 bg-white py-2 dark:bg-gray-800 border-gray-400 dark:border-gray-500"
        />
      </div>
    </div>
  );
};

export default ProductItem;
