import {
  Product,
  ProductSchema,
  ProductsParams,
  ProductsResponse,
  ProductsResponseSchema,
} from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com";

// Базовый класс для API ошибок
export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Базовая функция для HTTP запросов
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error occurred");
  }
}

// API методы для продуктов
export const productsApi = {
  // Получить все продукты с фильтрацией и пагинацией
  async getProducts(params: ProductsParams = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();

    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.skip) searchParams.append("skip", params.skip.toString());
    if (params.q) searchParams.append("q", params.q);
    if (params.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params.order) searchParams.append("order", params.order);

    const query = searchParams.toString();
    const endpoint = params.q
      ? `/products/search?${query}`
      : `/products?${query}`;

    const data = await fetchApi<unknown>(endpoint);

    // Валидация данных с помощью Zod
    const validatedData = ProductsResponseSchema.parse(data);
    return validatedData;
  },

  // Получить продукт по ID
  async getProductById(id: number): Promise<Product> {
    const data = await fetchApi<unknown>(`/products/${id}`);
    const validatedData = ProductSchema.parse(data);
    return validatedData;
  },

  // Получить продукты по категории
  async getProductsByCategory(
    category: string,
    params: ProductsParams = {}
  ): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();

    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.skip) searchParams.append("skip", params.skip.toString());
    if (params.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params.order) searchParams.append("order", params.order);

    const query = searchParams.toString();
    const endpoint = `/products/category/${encodeURIComponent(
      category
    )}?${query}`;

    const data = await fetchApi<unknown>(endpoint);
    const validatedData = ProductsResponseSchema.parse(data);
    return validatedData;
  },

  // Получить все категории
  async getCategories(): Promise<string[]> {
    const data = await fetchApi<string[]>("/products/categories");
    return data;
  },

  // Поиск продуктов
  async searchProducts(
    query: string,
    params: ProductsParams = {}
  ): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("q", query);

    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.skip) searchParams.append("skip", params.skip.toString());
    if (params.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params.order) searchParams.append("order", params.order);

    const endpoint = `/products/search?${searchParams.toString()}`;
    const data = await fetchApi<unknown>(endpoint);
    const validatedData = ProductsResponseSchema.parse(data);
    return validatedData;
  },
};

export const apiUtils = {
  // Обработка ошибок API
  handleApiError: (error: unknown): string => {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 404:
          return "Product not found";
        case 500:
          return "Server error. Please try again later";
        default:
          return error.message;
      }
    }
    return "An unknown error occurred";
  },

  // Создание URL с параметрами
  buildUrl(
    base: string,
    params: Record<string, string | number | boolean>
  ): string {
    const url = new URL(base);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });
    return url.toString();
  },
};
