import { z } from "zod";

// Zod схемы для валидации данных от API
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  images: z.array(z.string()),
  thumbnail: z.string(),
});

export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number().optional(),
  skip: z.number().optional(),
  limit: z.number().optional(),
});

// TypeScript типы, выведенные из Zod схем
export type Product = z.infer<typeof ProductSchema>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;

// Дополнительные типы для корзины и фильтров
export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  totalItems: number;
}

export interface FilterState {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  searchQuery: string;
  sortBy: "price-asc" | "price-desc" | "rating" | "name" | null;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

// Типы для API параметров
export interface ProductsParams {
  limit?: number;
  skip?: number;
  q?: string;
  category?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

// Типы для сравнения товаров
export interface ComparisonState {
  products: Product[];
  isOpen: boolean;
}
