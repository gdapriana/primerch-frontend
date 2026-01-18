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
import { VariantQueryWithRelation } from "@/helpers/type/variant.type";
import { variantTableHeader } from "@/app/(root)/(admin)/admin/variants/_components/table-properties";

const VariantTable = ({
  variants,
}: {
  variants: VariantQueryWithRelation[];
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-background">
          {variantTableHeader.map(
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
        {variants.map((variant: VariantQueryWithRelation, index: number) => (
          <tr
            key={index}
            className={cn(
              "hover:bg-primary/2 border-b border-primary/5",
              index === variants.length - 1 && "border-b-0",
            )}
          >
            <td className="p-4 text-sm">
              <Link href={`/products/${variant.product.slug}`}>
                {variant.product.name}
              </Link>
            </td>
            <td className="p-4">
              <button className="text-[12px] border border-primary/5 p-1 w-7 h-7 flex justify-center items-center">
                {variant.size.code}
              </button>
            </td>
            <td className="p-4">
              <button
                className="text-[12px] border border-primary/5 p-1 w-7 h-7 flex justify-center items-center"
                style={{ backgroundColor: variant.colour.code }}
              ></button>
            </td>
            <td className="p-4 text-center text-sm">{variant.stock}</td>
            <td className="p-4 text-center">
              <Button size="icon-sm" variant="destructive" asChild>
                <Link href={`/admin/variants/${variant.id}`}>
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

export default VariantTable;
