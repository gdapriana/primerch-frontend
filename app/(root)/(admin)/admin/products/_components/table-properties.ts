import { LucideIcon } from "lucide-react";

export type ProductTableHeaderType = {
  name: string;
  Icon?: LucideIcon;
};
export const productTableHeader: ProductTableHeaderType[] = [
  { name: "Cover" },
  { name: "Name & Description" },
  { name: "Category" },
  { name: "Variants" },
  { name: "Price" },
  { name: "Gender" },
  { name: "Statistics" },
  { name: "Actions" },
];
