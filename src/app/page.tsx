"use client";
import { useEffect, useState } from "react";

import { Product } from "@/types";
import { productsApi, apiUtils } from "@/services/api";
import withSkeleton from "@/components/hoc/with-skeleton";
import ProductList from "@/components/product-list";

const ProductListWithSkeleton = withSkeleton(ProductList, {
  skeletonCount: 12,
});

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getProducts({ limit: 12, skip: 0 });
        setProducts(data.products);
      } catch (err) {
        setError(apiUtils.handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) { 
    console.log("ERROR ",error)
    return <div>Ошибка: {error}</div>;
  }
  console.log(products)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>
      
      <ProductListWithSkeleton
        products={products}
        isLoading={loading}
        onAddToCart={(product) => console.log("Add to cart:", product.id)}
        onQuickView={(product) => console.log("Quick view:", product.id)}
        onToggleFavorite={(productId) => console.log("Toggle favorite:", productId)}
      />
    </div>
  );
}
