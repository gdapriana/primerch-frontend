import { LucideIcon } from "lucide-react";

export type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export type ProfileMenuType = {
  url: string;
  name: string;
  Icon?: LucideIcon;
};

export const profileMenu: ProfileMenuType[] = [
  { url: "/profile", name: "Your Profile" },
  { url: "/profile/bookmarked", name: "Bookmarked Product" },
  { url: "/profile/liked", name: "Liked Product" },
  { url: "/profile/orders", name: "Your Order History" },
];

export type OrderBy = "asc" | "desc";
export const orderBy: { name: string; value: OrderBy }[] = [
  {
    name: "Desc",
    value: "desc",
  },
  {
    name: "Asc",
    value: "asc",
  },
];

export type AdminMenuType = {
  url: string;
  name: string;
  Icon?: LucideIcon;
};

export const adminMenu: AdminMenuType[] = [
  { url: "/admin/products", name: "Products" },
  { url: "/admin/variants", name: "Variants" },
  { url: "/admin/categories", name: "Categories" },
  { url: "/admin/orders", name: "Orders" },
  { url: "/admin/users", name: "users" },
];
