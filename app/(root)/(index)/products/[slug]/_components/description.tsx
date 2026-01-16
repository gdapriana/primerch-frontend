"use client";
import { Button } from "@/components/ui/button";
import { BsCart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ProductRequest } from "@/helpers/request/product.request";
import { ProductWithRelation } from "@/helpers/type/product.type";
import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/helpers/context/auth/auth.hook";
import Link from "next/link";
import { toast } from "sonner";
import { CartRequest } from "@/helpers/request/cart.request";
import NoItem from "@/components/no-item";
import { CircleAlert } from "lucide-react";
import DescriptionLabel from "@/app/(root)/(index)/products/[slug]/_components/description-label";

export default function ProductDescription({
  product,
}: {
  product: ProductWithRelation;
}) {
  const { isAuthenticated, loading } = useAuth();
  const [stock, setStock] = useState<number>(0);
  const [colourId, setColourId] = useState<string>();
  const [sizeId, setSizeId] = useState<string>();
  const [getStokLoading, setGetStockLoading] = useState<boolean>(false);
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];
  const uniqueColours = Array.from(
    new Map(
      product.variants.map((v: ProductWithRelation["variants"][number]) => [
        v.colour.code,
        v.colour,
      ]),
    ).values(),
  );
  const uniqueSizes = Array.from(
    new Map(
      product.variants.map((v: ProductWithRelation["variants"][number]) => [
        v.size.code,
        v.size,
      ]),
    ).values(),
  ).sort(
    (a: any, b: any) => sizeOrder.indexOf(a.code) - sizeOrder.indexOf(b.code),
  );

  const isOutOfStock =
    product.variants.length === 0 ||
    product.variants.every((v) => (v.stock ?? 0) <= 0);

  useEffect(() => {
    async function getStock() {
      const stock = (
        await ProductRequest.GET_STOCK(
          {
            productId: product.id,
            colourId,
            sizeId,
          },
          { loadingValue: getStokLoading, setLoadingValue: setGetStockLoading },
        )
      ).data.result.item;
      setStock(stock);
    }
    if (colourId && sizeId) {
      getStock();
    }
  }, [colourId, sizeId]);

  const onAddToCart = async () => {
    if (!colourId && !sizeId) {
      toast.warning("Select colour and size!");
      return;
    }
    if (!colourId) {
      toast.warning("Select color!");
      return;
    }
    if (!sizeId) {
      toast.warning("Select size!");
      return;
    }
    const cartId = (await CartRequest.GET()).data.result.item.id;
    if (!cartId) {
      toast.error("No Cart found");
      return;
    }

    toast.promise(
      (async () => {
        const response = await CartRequest.ADD_PRODUCT({
          cartId,
          colourId,
          productId: product.id,
          sizeId,
        });
        if (!response.success && response.status === 409)
          throw new Error("Product already in cart");
        return response.data;
      })(),
      {
        success: "Product added to cart",
        loading: "Loading...",
        error: (e) => e.message,
      },
    );
  };

  return (
    <div className="p-8 pt-14 relative border border-primary/5 md:max-w-sm flex justify-start flex-col items-start gap-6">
      <span className="absolute z-20 font-bold right-0 top-0 text-background bg-primary flex justify-center items-center p-3">
        ${product.price.toString()}
      </span>
      <div className="flex flex-col justify-start gap-2 items-start">
        <h1 className="font-bold text-lg">{product.name}</h1>
        <p className="text-sm text-muted-foreground">{product.description}</p>

        <DescriptionLabel product={product} />
      </div>

      {isOutOfStock ? (
        <div className="flex justify-center items-center text-sm text-muted-foreground w-full">
          <NoItem
            title="Out of stock"
            Icon={CircleAlert}
            description="Will available soon!"
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1 justify-start items-start">
            <p className="text-sm text-muted-foreground">Colours</p>
            <div className="flex justify-start flex-wrap gap-1">
              {uniqueColours.map((colour: any, index: number) => (
                <div
                  onClick={() => setColourId(colour.id)}
                  key={index}
                  className={cn(
                    "w-8 h-8 border",
                    colour.id === colourId && "border-2 border-primary",
                  )}
                  style={{ backgroundColor: `${colour.code}` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 justify-start items-start">
            <p className="text-sm text-muted-foreground">Sizes</p>
            <div className="flex justify-start flex-wrap gap-1">
              {uniqueSizes.map((size: any, index: number) => (
                <Button
                  onClick={() => setSizeId(size.id)}
                  variant={size.id === sizeId ? "default" : "outline"}
                  size="sm"
                  key={index}
                >
                  {size.code}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}

      {getStokLoading && (
        <div className="flex flex-col gap-1 justify-start items-start">
          <p className="text-sm text-muted-foreground">Stock</p>
          <Spinner />
        </div>
      )}
      {!getStokLoading && stock !== 0 && (
        <div className="flex flex-col gap-1 justify-start items-start">
          <p className="text-sm text-muted-foreground">Stock</p>
          {stock}
        </div>
      )}

      {loading && (
        <Button className="w-full">
          Add to cart <BsCart />
        </Button>
      )}
      {!loading && !isAuthenticated && (
        <Button asChild className="w-full">
          <Link href="/login">
            Add to cart <BsCart />
          </Link>
        </Button>
      )}
      {!loading && isAuthenticated && (
        <Button
          disabled={isOutOfStock}
          onClick={() => onAddToCart()}
          className="w-full"
        >
          Add to cart <BsCart />
        </Button>
      )}
    </div>
  );
}
