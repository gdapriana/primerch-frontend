import { Prisma } from "@/helpers/generated/prisma/client";
import { Dispatch, SetStateAction } from "react";

export type CartWithRelation = Prisma.CartGetPayload<{
  include: {
    products: {
      include: {
        variant: {
          include: {
            product: {
              select: {
                slug: true;
                name: true;
                price: true;
                description: true;
                cover: { select: { url: true } };
              };
            };
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
      };
    };
  };
}>;

export type AddProductToCartRequest = {
  cartId: string;
  productId: string;
  colourId: string;
  sizeId: string;
};

export interface CartContextType {
  cartRefresh: boolean;
  setCartRefresh: Dispatch<SetStateAction<boolean>>;
}
