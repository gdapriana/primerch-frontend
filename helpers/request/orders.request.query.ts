import api from "@/helpers/api/api";
import { ORDER_STATUS, PAYMENT_METHOD } from "@/helpers/generated/prisma/enums";
import { OrderSortBy } from "@/helpers/type/order.type";

export type OrderQueryParams = {
  q?: string;
  status?: ORDER_STATUS;
  paymentMethod?: PAYMENT_METHOD;
  total?: number;
  cursor?: string;
  take?: number;
  sort?: OrderSortBy;
  order?: "asc" | "desc";
};

export async function fetchOrders(params: OrderQueryParams) {
  const { data } = await api.get("/orders", {
    params: {
      ...params,
    },
  });
  return data;
}
