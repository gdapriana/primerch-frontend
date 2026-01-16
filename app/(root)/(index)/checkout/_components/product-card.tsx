import { CartWithRelation } from "@/helpers/type/cart.type";
import { ImageOff } from "lucide-react";
import Image from "next/image";

export default function ProductCard({
  product,
}: {
  product: CartWithRelation["products"][number];
}) {
  return (
    <div className="flex border border-primary/5 flex-col justify-start items-stretch gap-4 hover:bg-muted-foreground/5 p-3">
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
          <h3 className="font-semibold line-clamp-1">
            {product.variant?.product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-1">
            {product.variant?.product.description}
          </p>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
            ${product.variant?.product.price.toString()}
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
          <button className="text-xs flex items-center gap-1" disabled>
            {product.quantity} items of {product.variant?.stock} stock
          </button>
        </div>

        <p className="ml-auto">
          <span className="font-semibold">
            $
            {(
              product.quantity * Number(product.variant?.product.price)
            ).toFixed(2)}
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
