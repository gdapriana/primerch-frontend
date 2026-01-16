import { Prisma } from "@/helpers/generated/prisma/client";

export type CreateReviewRequest = {
  orderId: string;
  rating: number;
  comment?: string;
};

export type ReviewQueryWithRelation = Prisma.ReviewGetPayload<{
  select: {
    id: true;
    comment: true;
    createdAt: true;
    rating: true;
    user: {
      select: {
        email: true;
      };
    };
  };
}>;
