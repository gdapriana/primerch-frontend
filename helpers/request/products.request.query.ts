import api from "@/helpers/api/api";
import { GENDER } from "@/helpers/generated/prisma/enums";
import { ProductSortBy } from "@/helpers/type/product.type";
export type ProductQueryParams = {
  q?: string;
  name?: string;
  gender?: GENDER | "ALL";
  category?: string;
  published?: boolean;
  minStock?: number;
  maxStock?: number;
  minPrice?: number;
  maxPrice?: number;
  cursor?: string;
  take?: number;
  sort?: ProductSortBy;
  order?: "asc" | "desc";
};

export async function fetchProducts(params: ProductQueryParams) {
  const { data } = await api.get("/products", {
    params: {
      ...params,
      published:
        typeof params.published === "boolean"
          ? String(params.published)
          : undefined,
    },
  });
  return data;
}
