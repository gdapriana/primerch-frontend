import api from "@/helpers/api/api";
import { GENDER } from "@/helpers/generated/prisma/enums";
import { ProductSortBy } from "@/helpers/type/product.type";
import { VariantSortBy } from "@/helpers/type/variant.type";
export type VariantQueryParams = {
  productName?: string;
  category?: string;
  colourCode?: string;
  sizeCode?: string;
  minStock?: number;
  maxStock?: number;
  cursor?: string;
  take?: number;
  sort?: VariantSortBy;
  order?: "asc" | "desc";
};

export async function fetchVariants(params: VariantQueryParams) {
  const { data } = await api.get("/variants", {
    params: {
      ...params,
    },
  });
  return data;
}
