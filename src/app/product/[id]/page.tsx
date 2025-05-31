import { productsApi } from "@/services/api";
import { ProductDetailClientWrapper } from "@/components/product-detail/client-wrapper";
import Header from "@/components/header";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = parseInt((await params).id);
  const product = await productsApi.getProduct(productId);

  return (
    <div className="container mx-auto px-4">
      <Header />
      
      {!product ? (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="text-gray-600">
            The product you are looking for does not exist.
          </p>
        </div>
      ) : (
        <ProductDetailClientWrapper product={product} />
      )}
    </div>
  );
}
