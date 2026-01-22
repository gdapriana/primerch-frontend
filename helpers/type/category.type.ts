import { Prisma } from "@/helpers/generated/prisma/client";

export type CategorySortBy = "createdAt" | "updatedAt" | "name";

export const categorySortBy: { name: string; value: CategorySortBy }[] = [
  { name: "Created At", value: "createdAt" },
  { name: "Updated At", value: "updatedAt" },
  { name: "Name", value: "name" },
];

export type CategoryQueryWithRelation = Prisma.CategoryGetPayload<{
  select: {
    _count: {
      select: {
        products: true;
      };
    };
    cover: {
      select: {
        url: true;
      };
    };
    name: true;
    slug: true;
    description: true;
    id: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type CategoryWithRelation = Prisma.CategoryGetPayload<{
  select: {
    _count: {
      select: {
        products: true;
      };
    };
    description: true;
    cover: {
      select: {
        url: true;
      };
    };
    name: true;
    slug: true;
    id: true;
    createdAt: true;
    updatedAt: true;
  };
}>;
