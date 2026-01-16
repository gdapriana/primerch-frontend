import React from "react";
import { ProductQueryWithRelation } from "@/helpers/type/product.type";
import {
  productTableHeader,
  ProductTableHeaderType,
} from "@/app/(root)/(admin)/admin/products/_components/table-properties";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Heart,
  ImageOff,
  Mars,
  PenBox,
  Star,
  Trash,
  Venus,
  VenusAndMars,
} from "lucide-react";
import Image from "next/image";
import NoItem from "@/components/no-item";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProductTable = ({
  products,
}: {
  products: ProductQueryWithRelation[];
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-background">
          {productTableHeader.map(
            (header: ProductTableHeaderType, index: number) => (
              <th
                className={cn(
                  "text-sm border-b border-r border-primary/5 whitespace-nowrap text-start font-semibold p-4",
                  index === productTableHeader.length - 1 && "border-r-0",
                )}
                key={index}
              >
                {header.name}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody className="flex-1 overflow-auto">
        {products.map((product: ProductQueryWithRelation, index: number) => (
          <tr
            key={index}
            className={cn(
              "hover:bg-primary/2 border-b border-primary/5",
              index === products.length - 1 && "border-b-0",
            )}
          >
            <td className="p-4 border-r border-primary/5 text-sm">
              {product.cover?.url ? (
                <div className="w-[80px] aspect-video">
                  <Image
                    src={product.cover.url}
                    alt="cover"
                    width={100}
                    height={80}
                    loading="lazy"
                  />
                </div>
              ) : (
                <NoItem
                  title={""}
                  Icon={ImageOff}
                  style={{ icon: "w-4 text-muted-foreground" }}
                />
              )}
            </td>
            <td className="p-4 text-sm border-r border-primary/5 flex-col justify-start items-start gap-1">
              <h3 className="whitespace-nowrap">{product.name}</h3>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {product.description}
              </p>
            </td>
            <td className="p-4 text-center border-r border-primary/5">
              <Button size="sm" className="text-xs">
                {product.category?.name}
              </Button>
            </td>
            <td className="p-4 text-center text-sm border-r border-primary/5">
              {product.variants.length}
            </td>
            <td className="p-4 text-sm border-r border-primary/5">
              ${Number(product.price).toFixed(2)}
            </td>
            <td className="p-4 text-sm text-center border-r border-primary/5">
              <Button size="icon-sm" variant="outline">
                {product.gender === "UNISEX" && <VenusAndMars />}
                {product.gender === "MALE" && <Venus />}
                {product.gender === "FEMALE" && <Mars />}
              </Button>
            </td>
            <td className="p-4 text-sm gap-1 border-r border-primary/5 flex flex-col justify-start items-stretch">
              <button className="hover:bg-primary/2 text-xs line-clamp-1 flex justify-center items-center gap-1 border border-primary/5 py-1 px-4">
                <Heart className="w-3 h-3" />
                {product._count.likedByUsers}
              </button>
              <button className="hover:bg-primary/2 text-xs line-clamp-1 flex justify-center items-center gap-1 border border-primary/5 py-1 px-4">
                <Bookmark className="w-3 h-3" />
                {product._count.bookmarkedByUsers}
              </button>
              <button className="hover:bg-primary/2 text-xs line-clamp-1 flex justify-center items-center gap-1 border border-primary/5 py-1 px-4">
                <PenBox className="w-3 h-3" />
                {product.reviewCount}
              </button>
              <button className="hover:bg-primary/2 text-xs line-clamp-1 flex justify-center items-center gap-1 border border-primary/5 py-1 px-4">
                <Star fill="orange" stroke="orange" className="w-3 h-3" />
                {Number(product.averageRating).toFixed(1)}
              </button>
            </td>
            <td className="text-center">
              <Button size="icon-sm" className="mr-1" asChild>
                <Link href={`/admin/products/${product.slug}`}>
                  <PenBox className="w-2 h-2" />
                </Link>
              </Button>
              <Button size="icon-sm" variant="destructive" asChild>
                <Link href={`/admin/products/${product.slug}`}>
                  <Trash className="w-2 h-2" />
                </Link>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
