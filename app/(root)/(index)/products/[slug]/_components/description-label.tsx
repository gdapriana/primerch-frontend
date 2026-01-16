"use client";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/helpers/context/auth/auth.hook";
import { BookmarkRequest } from "@/helpers/request/bookmark.request";
import { LikeRequest } from "@/helpers/request/like.request";
import { ProductWithRelation } from "@/helpers/type/product.type";
import { Response } from "@/helpers/type/response.type";
import { Bookmark, Heart, Layers2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DescriptionLabel({
  product,
}: {
  product: ProductWithRelation;
}) {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [likedLoading, setLikedLoading] = useState<boolean>(true);
  const [bookmarkedLoading, setBookmarkedLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<{
    status: boolean;
    total: number;
  }>({
    status: false,
    total: 0,
  });
  const [bookmarked, setBookmarked] = useState<{
    status: boolean;
    total: number;
  }>({
    status: false,
    total: 0,
  });

  useEffect(() => {
    (async () => {
      const likeResponse: Response = await LikeRequest.CHECK(product.id, {
        loadingValue: likedLoading,
        setLoadingValue: setLikedLoading,
      });
      const likeCountResponse: Response = await LikeRequest.COUNT_ALL(
        product.id,
        {
          loadingValue: likedLoading,
          setLoadingValue: setLikedLoading,
        },
      );

      setLiked({
        ...liked,
        status: likeResponse.data.result.item,
        total: likeCountResponse.data.result.item,
      });
    })();
  }, [liked.status]);

  useEffect(() => {
    (async () => {
      const bookmarkResponse: Response = await BookmarkRequest.CHECK(
        product.id,
        {
          loadingValue: bookmarkedLoading,
          setLoadingValue: setBookmarkedLoading,
        },
      );

      const bookmarkCountResponse: Response = await BookmarkRequest.COUNT_ALL(
        product.id,
        {
          loadingValue: bookmarkedLoading,
          setLoadingValue: setBookmarkedLoading,
        },
      );
      setBookmarked({
        ...bookmarked,
        status: bookmarkResponse.data.result.item,
        total: bookmarkCountResponse.data.result.item,
      });
    })();
  }, [bookmarked.status]);
  const toggleLike = async () => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }
    toast.promise(
      (async () => {
        const response = await LikeRequest.TOGGLE(product.id, {
          loadingValue: likedLoading,
          setLoadingValue: setLikedLoading,
        });
        return response;
      })(),
      {
        success: () => {
          if (liked.status) {
            setLiked({ ...liked, status: false });
          } else {
            setLiked({ ...liked, status: true });
          }
          return liked.status ? "Removed from like" : "Liked";
        },
        loading: "Loading...",
        error: "Something went wrong",
      },
    );
  };

  const toggleBookmark = async () => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }
    toast.promise(
      (async () => {
        const response = await BookmarkRequest.TOGGLE(product.id, {
          loadingValue: bookmarkedLoading,
          setLoadingValue: setBookmarkedLoading,
        });
        return response;
      })(),
      {
        success: () => {
          if (bookmarked.status) {
            setBookmarked({ ...bookmarked, status: false });
          } else {
            setBookmarked({ ...bookmarked, status: true });
          }
          return bookmarked.status ? "Removed from bookmark" : "Bookmarked";
        },
        loading: "Loading...",
        error: "Something went wrong",
      },
    );
  };

  return (
    <div className="flex gap-1 justify-start mt-2 items-start flex-wrap">
      <Button size="sm" variant="outline">
        <Layers2 />
        {product.category?.name}
      </Button>
      <Button
        size="sm"
        disabled={loading || bookmarkedLoading}
        onClick={() => toggleBookmark()}
        className="cursor-pointer"
        variant={
          !isAuthenticated || bookmarkedLoading
            ? "outline"
            : !bookmarkedLoading && bookmarked.status
              ? "default"
              : "outline"
        }
      >
        {bookmarkedLoading ? (
          <Spinner className="w-3 h-3" />
        ) : (
          <>
            <Bookmark />
            <span className="text-xs">{bookmarked.total}</span>
          </>
        )}
      </Button>
      <Button
        disabled={loading || likedLoading}
        onClick={() => toggleLike()}
        className="cursor-pointer"
        size="sm"
        variant={
          !isAuthenticated || likedLoading
            ? "outline"
            : !likedLoading && liked.status
              ? "default"
              : "outline"
        }
      >
        {likedLoading ? (
          <Spinner className="w-3 h-3" />
        ) : (
          <>
            <Heart />
            <span className="text-xs">{liked.total}</span>
          </>
        )}
      </Button>
    </div>
  );
}
