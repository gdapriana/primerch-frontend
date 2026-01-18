import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/helpers/request/product.request.query";

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });
}
