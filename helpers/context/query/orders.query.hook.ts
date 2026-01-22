import { useQuery } from "@tanstack/react-query";
import {
  fetchOrders,
  OrderQueryParams,
} from "@/helpers/request/orders.request.query";

export function useOrders(params: OrderQueryParams) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => fetchOrders(params),
  });
}
