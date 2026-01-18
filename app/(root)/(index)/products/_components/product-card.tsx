"use client";
import NoItem from "@/components/no-item";
import { Button } from "@/components/ui/button";
import { ProductQueryWithRelation } from "@/helpers/type/product.type";
import { ImageOff, Mars, Star, Venus, VenusAndMars } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BiUser } from "react-icons/bi";

export default function ProductCard({
  product,
}: {
  product: ProductQueryWithRelation;
}) {
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];
  const uniqueSizes = Array.from(
    new Map(product.variants.map((v) => [v.size.code, v.size])).values(),
  ).sort((a, b) => sizeOrder.indexOf(a.code) - sizeOrder.indexOf(b.code));
  const isOutOfStock =
    product.variants.length === 0 ||
    product.variants.every((v) => (v.stock ?? 0) <= 0);
  return (
    <Link
      key={product.id}
      href={`/products/${product.slug}`}
      className="flex gap-2 border border-primary/5 hover:bg-primary/3 flex-col justify-start items-stretch"
    >
      <div className="w-full relative flex">
        {product.cover?.url ? (
          <Image
            src={product.cover?.url}
            loading="lazy"
            alt="cover"
            width={600}
            height={600}
            className="aspect-9/10 object-cover z-10"
          />
        ) : (
          <NoItem
            Icon={ImageOff}
            style={{
              icon: `w-5 h-5 text-muted-foreground ${isOutOfStock && "hidden"}`,
              container: "aspect-9/10 w-full",
              title: "text-sm text-muted-foreground",
            }}
            title={isOutOfStock ? "" : "No Image Provided"}
          />
        )}
        {isOutOfStock && (
          <div className="absolute text-background bg-primary/70 left-0 top-0 w-full h-full z-20 flex justify-center items-center">
            Out of Stock
          </div>
        )}
      </div>
      <div className="flex h-full p-2 gap-3 md:flex-row flex-col justify-start md:justify-between items-start">
        <div className="flex flex-col h-full gap-1 justify-start items-start">
          <h3 className="font-semibold text-sm">{product.name}</h3>
          <p className="text-muted-foreground mb-4 text-xs">
            {product.category?.name}
          </p>
          <div className="flex mt-auto justify-start gap-1 mt-4 items-center">
            <button className="w-6 h-6 text-background bg-primary flex justify-center items-center">
              {product.gender === "UNISEX" && (
                <VenusAndMars className="w-4 h-4" />
              )}
              {product.gender === "MALE" && <Mars className="w-4 h-4" />}
              {product.gender === "FEMALE" && <Venus className="w-4 h-4" />}
            </button>
            {!isOutOfStock && (
              <div className="gap-0.5 flex flex-wrap justify-start items-center">
                {uniqueSizes.map((item: { code: string }, index: number) => (
                  <button
                    key={index}
                    className="w-6 h-6 text-[10px] text-muted-foreground bg-background border border-primary/5 flex justify-center items-center"
                  >
                    {item.code}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start items-start">
          <p className="text-base font-bold">${product.price.toString()}</p>
          <div className="flex flex-col justify-start items-start text-sm text-muted-foreground">
            <span className="flex justify-start items-center gap-1">
              <Star fill="orange" stroke="orange" className="w-[1rem]" />
              {Number(product.averageRating.toString()).toFixed(1)}
            </span>
            <span className="flex justify-start items-center gap-1">
              <BiUser className="w-[1rem]" />
              {product.reviewCount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
