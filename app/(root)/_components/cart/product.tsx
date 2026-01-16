"use client";
import DeleteProductCartAlert from "@/app/(root)/_components/cart/delete-alert";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useCart } from "@/helpers/context/cart/cart.hook";
import { CartRequest } from "@/helpers/request/cart.request";
import { CartWithRelation } from "@/helpers/type/cart.type";
import { Response } from "@/helpers/type/response.type";
import { ArrowLeft, ArrowRight, ImageOff, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function ProductCart({
  product,
  setSheetOpen,
}: {
  product: CartWithRelation["products"][number];
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { setCartRefresh } = useCart();
  const [currentQty, setCurrentQty] = useState<number>(1);
  const [currentStock, setCurrentStock] = useState<number>();
  const [currentPrice, setCurrentPrice] = useState<number>();
  const [totalPrice, setTotalPrice] = useState<number>();
  const [loadingUpdateQty, setLoadingUpdateQty] = useState<boolean>(false);

  useEffect(() => {
    setCurrentQty(product.quantity);
    setCurrentStock(product.variant?.stock);
    setCurrentPrice(Number(product.variant?.product.price));
  }, []);

  useEffect(() => {
    if (currentPrice) setTotalPrice(currentPrice * currentQty);
  }, [currentQty, currentPrice]);

  const updateQty = async (mode: "inc" | "dec") => {
    const response: Response = await CartRequest.PATCH_QTY(
      mode,
      product.id,
      {
        loadingValue: loadingUpdateQty,
        setLoadingValue: setLoadingUpdateQty,
      },
      {
        setCartRefreshValue: setCartRefresh,
      },
    );

    setCurrentQty(response.data.result.item.currentQuantity);
    setCurrentStock(response.data.result.item.stock);
  };

  return (
    <div className="flex flex-col justify-start items-stretch gap-4 hover:bg-muted-foreground/5 p-3">
      <div className="flex justify-center gap-2 items-stretch">
        <div className="flex justify-center h-20 items-center">
          {product.variant?.product.cover?.url ? (
            <Image
              src={product.variant.product.cover.url}
              alt={product.variant.product.name}
              width={200}
              loading="lazy"
              height={200}
              className="aspect-square w-fit h-full"
            />
          ) : (
            <div className="h-full aspect-square bg-muted-foreground/10 flex justify-center items-center">
              <ImageOff className="text-muted-foreground/15" />
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-start items-start">
          <Link
            onClick={() => setSheetOpen(false)}
            href={`/products/${product.variant?.product.slug}`}
            className="font-semibold text-sm line-clamp-1"
          >
            {product.variant?.product.name}
          </Link>
          <p className="text-muted-foreground text-xs line-clamp-1">
            {product.variant?.product.description}
          </p>
          <div className="flex gap-1 mt-2">
            <div className="border text-xs w-6 h-6 flex justify-center items-center">
              {product.variant?.size.code}
            </div>
            <div
              style={{ backgroundColor: product.variant?.colour.code }}
              className="border w-6 h-6 flex justify-center items-center"
            ></div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-3">
          <Button
            disabled={currentQty === 1 || loadingUpdateQty}
            variant="outline"
            onClick={() => updateQty("dec")}
            className="border w-6 h-6 flex justify-center items-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <button className="text-xs flex items-center gap-1" disabled>
            {loadingUpdateQty ? (
              <Spinner className="w-3 border h-3" />
            ) : (
              currentQty
            )}{" "}
            {currentStock && `of ${currentStock}`}
          </button>
          <Button
            disabled={currentQty === currentStock || loadingUpdateQty}
            variant="outline"
            onClick={() => updateQty("inc")}
            className="border w-6 h-6 flex justify-center items-center"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <p className="ml-auto">${totalPrice?.toFixed(2)}</p>

        <DeleteProductCartAlert
          setSheetOpen={setSheetOpen}
          productInCart={product}
        />
      </div>
    </div>
  );
}
