import { Prisma } from "@/helpers/generated/prisma/client";
export type VariantSortBy = "createdAt" | "updatedAt" | "productName" | "stock";

export const variantSortBy: { name: string; value: VariantSortBy }[] = [
  { name: "Stock", value: "stock" },
  { name: "Product Name", value: "productName" },
  { name: "Updated At", value: "updatedAt" },
  { name: "Created Date", value: "createdAt" },
];

export type VariantQueryWithRelation = Prisma.VariantGetPayload<{
  include: {
    product: {
      select: {
        name: true;
        id: true;
        slug: true;
        cover: {
          select: {
            url: true;
          };
        };
      };
    };
    colour: {
      select: {
        name: true;
        code: true;
      };
    };
    size: {
      select: {
        name: true;
        code: true;
      };
    };
  };
}>;
