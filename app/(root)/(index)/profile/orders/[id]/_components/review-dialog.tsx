"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";
import { Review } from "@/helpers/generated/prisma/client";
import { ReviewRequest } from "@/helpers/request/review.request";
import { OrderDetailsWithRelation } from "@/helpers/type/order.type";
import { Response } from "@/helpers/type/response.type";
import { cn } from "@/lib/utils";
import { CircleCheck, Star } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ReviewDialog({
  orderId,
  product,
}: {
  orderId: string;
  product: OrderDetailsWithRelation["items"][number];
}) {
  const MAX_RATING = 5;
  const [review, setReview] = useState<Review>();
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response: Response = await ReviewRequest.CHECK_IS_REVIEWED(
        product.variant?.product.id!,
        { loadingValue: reviewLoading, setLoadingValue: setReviewLoading },
      );
      setReview(response.data.result.item);
      if (review) setRating(response.data.result.item.rating);
      if (review) setReviewText(response.data.result.item.comment);
    })();
  }, [dialogOpen]);

  const handleStarHover = (index: number) => {
    setHoverRating(index);
  };

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const onReviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    toast.promise(
      (async () => {
        const response = await ReviewRequest.CREATE(
          {
            orderId,
            rating,
            comment: reviewText,
          },
          product.variant?.product.id!,
        );
        return response;
      })(),
      {
        success: "Review success",
        loading: "Loading...",
        error: "Something went wrong",
      },
    );
  };

  const displayRating = hoverRating || rating;

  return (
    <Dialog open={dialogOpen} onOpenChange={(e) => setDialogOpen(e)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer" size="sm">
          Write Review {review && <CircleCheck />}
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-center">Product Review</DialogTitle>
          <DialogDescription className="text-center">
            Review {product.variant?.product.name}
          </DialogDescription>
        </DialogHeader>

        {reviewLoading && <Spinner />}

        {!reviewLoading && (
          <form onSubmit={onReviewSubmit}>
            <div className="w-full flex flex-col justify-start gap-4 items-stretch">
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-sm font-medium text-center">
                  {!review
                    ? "Rate this product"
                    : "Your rating about the product"}
                </p>
                <div className="flex gap-2 justify-center items-center">
                  {Array.from({ length: MAX_RATING }).map((_, index) => {
                    const starIndex = index + 1;
                    const isFilled = starIndex <= displayRating;

                    return (
                      <button
                        type="button"
                        key={index}
                        disabled={!!review}
                        onClick={() => handleStarClick(starIndex)}
                        onMouseEnter={() => handleStarHover(starIndex)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          size={32}
                          className={`transition-colors ${
                            isFilled
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                {rating > 0 && (
                  <p className="text-center text-sm text-gray-600">
                    {rating} out of {MAX_RATING} stars
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col justify-start items-stretch gap-4 overflow-hidden">
                <label htmlFor="review" className="text-sm font-medium">
                  {!review ? "Your Review (Optional)" : "Your Review"}
                </label>
                <textarea
                  id="review"
                  placeholder="Share your thoughts about this product..."
                  value={reviewText}
                  rows={4}
                  disabled={!!review}
                  onChange={(e) => setReviewText(e.target.value)}
                  className={cn(
                    "w-full p-3 text-sm rounded-none border resize-none min-h-24",
                    review && "text-muted-foreground",
                  )}
                />

                {!review && (
                  <p className="text-xs text-gray-500">
                    {reviewText.length} / 500 characters
                  </p>
                )}
              </div>
            </div>

            {!review && (
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={rating === 0}>
                  Submit Review
                </Button>
              </DialogFooter>
            )}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
