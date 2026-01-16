"use client";

import NoItem from "@/components/no-item";
import Spinner from "@/components/ui/spinner";
import { ReviewRequest } from "@/helpers/request/review.request";
import { Response } from "@/helpers/type/response.type";
import { ReviewQueryWithRelation } from "@/helpers/type/review.type";
import { Decimal } from "@prisma/client/runtime/client";
import { MessageCircleOff, Star } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Reviews({
  productId,
  avgRating,
}: {
  productId: string;
  avgRating: Decimal;
}) {
  const [reviews, setReviews] = useState<ReviewQueryWithRelation[]>();
  const [totalReviews, setTotalReviews] = useState<number>();
  const [loadingTotalReviews, setLoadingTotalReviews] =
    useState<boolean>(false);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response: Response = await ReviewRequest.QUERY(productId, query, {
        loadingValue: loadingReviews,
        setLoadingValue: setLoadingReviews,
      });
      setReviews(response.data.result.items);
    })();
    (async () => {
      const response: Response = await ReviewRequest.TOTAL(productId, {
        loadingValue: loadingTotalReviews,
        setLoadingValue: setLoadingTotalReviews,
      });
      setTotalReviews(response.data.result.item);
    })();
  }, []);

  return (
    <div className="p-8 relative border border-primary/5 md:max-w-sm flex justify-start flex-col items-stretch gap-6">
      <div className="flex justify-between gap-2 items-center">
        <h1 className="font-bold text-lg">Buyer Reviews</h1>
        <span className="flex text-muted-foreground text-sm justify-center items-center gap-0.5">
          {Number(avgRating.toString()).toFixed(1)}{" "}
          <Star className="w-4 h-4 inline" fill="orange" stroke="orange" />{" "}
          {loadingTotalReviews ? (
            <Spinner />
          ) : (
            <>
              ({totalReviews}
              <span className="hidden md:inline"> Reviews</span>)
            </>
          )}
        </span>
      </div>

      <div className="flex flex-col justify-start items-stretch">
        {loadingReviews && <Spinner />}
        {!loadingReviews && reviews && (
          <div className="flex flex-col gap-6 justify-start items-stretch">
            {reviews.map((review: ReviewQueryWithRelation) => (
              <article
                key={review.id}
                className="flex flex-row justify-center gap-2 items-start"
              >
                <div className="flex gap-2 justify-center tart items-start">
                  <div className="w-6 h-6 rounded-full bg-muted-foreground/20"></div>
                </div>

                <div className="flex-1 flex-col justify-start items-start flex gap-1">
                  <div className="flex w-full justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {review.user.email}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {moment(review.createdAt).fromNow()}
                    </p>
                  </div>

                  <p className="text-sm">{review.comment}</p>
                  <div className="flex gap-1 justify-start items-center mt-2">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const filled = index + 1 <= review.rating;

                      return (
                        <Star
                          key={index}
                          className="w-3 h-3"
                          fill={filled ? "orange" : "none"}
                          stroke={filled ? "orange" : "currentColor"}
                        />
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {!loadingReviews && (!reviews || reviews.length === 0) && (
          <NoItem
            title="No reviewed yet"
            style={{
              container: "w-full",
              title: "text-sm text-muted-foreground",
              icon: "w-5 h-5",
            }}
            Icon={MessageCircleOff}
          />
        )}
      </div>
    </div>
  );
}
