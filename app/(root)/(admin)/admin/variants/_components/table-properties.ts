import { LucideIcon } from "lucide-react";

export type VariantTableHeaderType = {
  name: string;
  Icon?: LucideIcon;
};
export const variantTableHeader: VariantTableHeaderType[] = [
  { name: "Product Name" },
  { name: "Size" },
  { name: "Colour" },
  { name: "Stock" },
  { name: "Actions" },
];
