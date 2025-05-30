import React from "react";
import { Product } from "@/types";
import ProductImage from "./ui/product-image";
import PriceDisplay from "./ui/price-display";
import ProductRating from "./ui/product-rating";
import AddToCartButton from "./ui/add-to-cart-button";
import ProductBadge from "./ui/product-badge";
import FavoriteButton from "./ui/favorite-button";
import QuickViewButton from "./ui/quick-view-button";

interface ProductItemProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onToggleFavorite?: (productId: number) => void;
  isFavorite?: boolean;
  className?: string;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleFavorite,
  isFavorite = false,
  className = "",
}) => {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;
  const isInStock = product.stock > 0;

  return (
    <div
      className={`group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300 ${className}`}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {hasDiscount && (
          <ProductBadge type="discount" value={product.discountPercentage} />
        )}
        {!isInStock && <ProductBadge type="out-of-stock" />}
      </div>

      {/* Action buttons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {onToggleFavorite && (
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={() => onToggleFavorite(product.id)}
          />
        )}
        {onQuickView && (
          <QuickViewButton onClick={() => onQuickView(product)} />
        )}
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <ProductImage
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-gray-500 mb-1">{product.brand || "No Brand"}</p>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 h-10">
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

        {/* Add to Cart Button */}
        <AddToCartButton
          onClick={() => onAddToCart ? onAddToCart(product) : console.log(`product ${product.id}`) }
          disabled={!isInStock}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProductItem;
