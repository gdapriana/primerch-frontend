import { useQuery } from "@tanstack/react-query";
import { fetchProductGallery } from "@/helpers/request/gallery.request.query";

export function useProductGallery(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductGallery(productId),
  });
}
