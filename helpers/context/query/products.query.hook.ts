import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  ProductQueryParams,
} from "@/helpers/request/products.request.query";

export function useProducts(params: ProductQueryParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
  });
}
