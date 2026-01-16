import { Prisma } from "@/helpers/generated/prisma/client";

export type ProductQueryWithRelation = Prisma.ProductGetPayload<{
  include: {
    _count: {
      select: {
        likedByUsers: true;
        bookmarkedByUsers: true;
        variants: true;
      };
    };
    category: {
      select: {
        name: true;
        slug: true;
      };
    };
    cover: {
      select: {
        url: true;
      };
    };
    variants: {
      select: {
        stock: true;
        colour: {
          select: {
            code: true;
            name: true;
          };
        };
        size: {
          select: {
            code: true;
          };
        };
      };
    };
  };
}>;
export type ProductWithRelation = Prisma.ProductGetPayload<{
  include: {
    category: {
      select: {
        name: true;
        id: true;
        slug: true;
      };
    };
    cover: {
      select: {
        url: true;
      };
    };
    variants: {
      select: {
        stock: true;
        colour: {
          select: {
            id: true;
            code: true;
            name: true;
          };
        };
        size: {
          select: {
            id: true;
            code: true;
            name: true;
          };
        };
      };
    };
    gallery: {
      select: {
        url: true;
        publicId: true;
      };
    };
  };
}>;

export type ProductSortBy =
  | "stock"
  | "price"
  | "liked"
  | "bookmarked"
  | "reviews"
  | "rating"
  | "createdAt";

export const productSortBy: { name: string; value: ProductSortBy }[] = [
  { name: "Stock", value: "stock" },
  { name: "Price", value: "price" },
  { name: "Liked", value: "liked" },
  { name: "Bookmarked", value: "bookmarked" },
  { name: "Reviews", value: "reviews" },
  { name: "Rating", value: "rating" },
  { name: "Created Date", value: "createdAt" },
];
