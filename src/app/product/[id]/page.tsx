import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetail from "@/components/product-detail";
import { Product } from "@/types";
import Header from "@/components/header";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="">
      <Header title="🛒 Cart" />

      <ProductDetail product={product} />
    </main>
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  if (isNaN(productId)) {
    return {
      title: "Product Not Found",
    };
  }

  const product = await getProduct(productId);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} - Your Store`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.thumbnail,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}
