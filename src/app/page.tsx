"use client";
import { useEffect, useState } from "react";

import { Product } from "@/types";
import { productsApi, apiUtils } from "@/services/api";
import ProductItem from "@/components/product-item";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getProducts({ limit: 10, skip: 0 });
        setProducts(data.products);
      } catch (err) {
        setError(apiUtils.handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  console.log(products)

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Продукты</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.id}
            onAddToCart={() => {}}
          />
        ))}
      </ul>
    </div>
  );
}
