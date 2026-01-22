import { LucideIcon } from "lucide-react";

export type OrderTableHeaderType = {
  name: string;
  Icon?: LucideIcon;
};
export const orderTableHeader: OrderTableHeaderType[] = [
  { name: "Informations" },
  { name: "Order Created" },
  { name: "Payment Method" },
  { name: "Total" },
  { name: "Actions" },
];
