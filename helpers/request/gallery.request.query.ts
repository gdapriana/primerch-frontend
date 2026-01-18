import api from "@/helpers/api/api";
export async function fetchProductGallery(productId: string) {
  const { data } = await api.get(`/products/${productId}/gallery`);
  return data;
}
