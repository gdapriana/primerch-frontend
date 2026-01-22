import { LucideIcon } from "lucide-react";

export type CategoryTableHeaderType = {
  name: string;
  Icon?: LucideIcon;
};
export const categoryTableHeader: CategoryTableHeaderType[] = [
  { name: "Cover" },
  { name: "Name & Descriptions" },
  { name: "Products Count" },
  { name: "Actions" },
];
