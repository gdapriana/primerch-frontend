import api from "@/helpers/api/api";
import { CategorySortBy } from "@/helpers/type/category.type";

export type CategoryQueryParams = {
  q?: string;
  cursor?: string;
  take?: number;
  sort?: CategorySortBy;
  order?: "asc" | "desc";
};

export type CategoryBodyRequest = {
  name: string;
  description?: string;
  coverId?: string;
};

export async function fetchCategories(params: CategoryQueryParams) {
  const { data } = await api.get("/categories", {
    params: {
      ...params,
    },
  });
  return data;
}

export async function postCategory(body: CategoryBodyRequest) {
  const { data } = await api.post("/categories", body);
  return data;
}
