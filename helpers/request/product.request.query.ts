import api from "@/helpers/api/api";
export async function fetchProductById(productId: string) {
  const { data } = await api.get(`/products/get?by=id&key=${productId}`);
  return data;
}
