import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CategoryBodyRequest,
  CategoryQueryParams,
  fetchCategories,
  postCategory,
} from "@/helpers/request/categories.request.query";

export function useCategories(params: CategoryQueryParams) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => fetchCategories(params),
  });
}

export function usePostCategory() {
  return useMutation({
    mutationFn: postCategory,
  });
}
