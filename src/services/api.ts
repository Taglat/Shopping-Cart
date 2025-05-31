import {
  Category,
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

// Базовая функция для HTTP запросов с кешированием для серверных компонентов
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit & { cache?: RequestCache; revalidate?: number }
): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      // Настройки кеширования Next.js
      cache: options?.cache || "force-cache",
      next: {
        revalidate: options?.revalidate || 3600, // 1 час по умолчанию
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

// API методы для продуктов (серверная версия)
export const productsApi = {
  // Получить все продукты с фильтрацией и пагинацией
  async getProducts(params: { limit?: number; skip?: number } = {}) {
    const { limit = 12, skip = 0 } = params;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  // Получить продукт по ID
  async getProductById(
    id: number,
    options?: { revalidate?: number }
  ): Promise<Product> {
    const data = await fetchApi<unknown>(`/products/${id}`, {
      revalidate: options?.revalidate || 3600, // 1 час для отдельного продукта
    });
    const validatedData = ProductSchema.parse(data);
    return validatedData;
  },

  // Получить продукты по категории
  async getProductsByCategory(
    category: string,
    params: ProductsParams = {},
    options?: { revalidate?: number }
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

    const data = await fetchApi<unknown>(endpoint, {
      revalidate: options?.revalidate || 600, // 10 минут для категорий
    });
    const validatedData = ProductsResponseSchema.parse(data);
    return validatedData;
  },

  // Получить все категории
  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Проверяем, что получили массив
      if (Array.isArray(data)) {
        // Если это массив объектов с нужными полями
        if (
          data.length > 0 &&
          typeof data[0] === "object" &&
          "slug" in data[0]
        ) {
          return data.map((cat: Category) => cat.slug);
        }

        // Если это массив строк (старый формат API)
        if (data.length > 0 && typeof data[0] === "string") {
          return data;
        }
      }

      return [];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  },

  // Получить категории как объекты
  async getCategoriesWithDetails(): Promise<Category[]> {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Проверяем, что получили массив
      if (Array.isArray(data)) {
        // Если это массив объектов с нужными полями
        if (
          data.length > 0 &&
          typeof data[0] === "object" &&
          "slug" in data[0]
        ) {
          return data as Category[];
        }

        // Если это массив строк (старый формат API), преобразуем
        if (data.length > 0 && typeof data[0] === "string") {
          return data.map((categoryName: string) => ({
            slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
            name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
            url: `https://dummyjson.com/products/category/${categoryName
              .toLowerCase()
              .replace(/\s+/g, "-")}`,
          }));
        }
      }

      return [];
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return [];
    }
  },

  // Поиск продуктов
  async searchProducts(
    query: string,
    params: ProductsParams = {},
    options?: { revalidate?: number }
  ): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("q", query);

    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.skip) searchParams.append("skip", params.skip.toString());
    if (params.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params.order) searchParams.append("order", params.order);

    const endpoint = `/products/search?${searchParams.toString()}`;
    const data = await fetchApi<unknown>(endpoint, {
      cache: "no-store", // Не кешируем поиск
    });
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

  // Генерация статических параметров для динамических маршрутов
  async generateStaticParams() {
    try {
      const categories = await productsApi.getCategories();
      return categories.map((category) => ({
        slug: encodeURIComponent(category),
      }));
    } catch (error) {
      console.error("Failed to generate static params:", error);
      return [];
    }
  },

  // Генерация метаданных для продуктов
  async generateProductMetadata(id: number) {
    try {
      const product = await productsApi.getProductById(id);
      return {
        title: product.title,
        description: product.description,
        openGraph: {
          title: product.title,
          description: product.description,
          images: [product.thumbnail],
        },
      };
    } catch (error) {
      return {
        title: "Product Not Found",
        description: "The requested product could not be found.",
      };
    }
  },
};
