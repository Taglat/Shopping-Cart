"use client";
import { useEffect, useState } from "react";
import { Product, ProductsResponseSchema } from "@/types";
import { productsApi, apiUtils } from "@/services/api";
import withSkeleton from "@/components/hoc/with-skeleton";
import ProductList from "@/components/product-list";
import Pagination from "@/components/pagination";

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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * pageSize;
      console.log("Fetching products:", { limit: pageSize, skip });

      const data = await productsApi.getProducts({
        limit: pageSize,
        skip: skip,
      });
      
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

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  if (error) {
    console.log("ERROR ", error);
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

  console.log(products);

  return (
    <div>
      <h1>Каталог товаров</h1>

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
