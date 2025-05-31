"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import AddToCartButton from "../product-item/ui/add-to-cart-button";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;
  const isInStock = product.stock > 0;

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* Изображения */}
          <div className="space-y-2">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <Image
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-opacity-100"
                        : "border-opacity-20 hover:border-opacity-50"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о продукте */}
          <div className="space-y-2">
            {/* Бренд */}
            {product.brand && (
              <p className="text-sm opacity-70">{product.brand}</p>
            )}

            {/* Название */}
            <h1 className="text-3xl font-bold leading-tight">
              {product.title}
            </h1>

            {/* Рейтинг */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(product.rating) ? "" : "opacity-30"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm opacity-70">({product.rating})</span>
            </div>

            {/* Цена */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  $
                  {hasDiscount
                    ? discountedPrice.toFixed(2)
                    : product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl opacity-50 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      -{product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Наличие */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isInStock ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className="text-sm opacity-70">
                {isInStock ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            {/* Описание */}
            <div className="space-y-3">
              <p className="text-sm leading-relaxed opacity-80">
                {product.description}
              </p>
            </div>

            {/* Категория */}
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70">Category:</span>
              <span className="text-sm px-2 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Кнопка добавления в корзину */}
            <div className="pt-4">
              <AddToCartButton
                onClick={(e) => {
                  e.preventDefault();
                  onAddToCart(product);
                }}
                className="w-full border text-gray-900 dark:text-gray-100 py-3 bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}