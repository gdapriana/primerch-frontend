import React from "react";
import { productTableHeader } from "@/app/(root)/(admin)/admin/products/_components/table-properties";
import { cn } from "@/lib/utils";
import { QueryObserverResult, RefetchOptions } from "@tanstack/query-core";
import { CategoryQueryWithRelation } from "@/helpers/type/category.type";
import {
  categoryTableHeader,
  CategoryTableHeaderType,
} from "@/app/(root)/(admin)/admin/categories/_components/table-properties";
import Image from "next/image";
import NoItem from "@/components/no-item";
import { Eye, ImageOff, PenBox, Timer, Trash } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";

const CategoryTable = ({
  refetch,
  categories,
}: {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
  categories: CategoryQueryWithRelation[];
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-background">
          {categoryTableHeader.map(
            (header: CategoryTableHeaderType, index: number) => (
              <th
                className={cn(
                  "text-sm border-b border-r border-primary/5 whitespace-nowrap text-center font-semibold p-4",
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
        {categories.map(
          (category: CategoryQueryWithRelation, index: number) => (
            <tr
              key={index}
              className={cn(
                "hover:bg-primary/2 border-b border-primary/5",
                index === categories.length - 1 && "border-b-0",
              )}
            >
              <td className="p-4 border-r border-primary/5 text-sm">
                {category.cover?.url ? (
                  <div className="w-[80px] aspect-video">
                    <Image
                      src={category.cover.url}
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
              <td className="p-4">
                <span className="text-sm font-semibold">{category.name}</span>
                <br />
                <span className="text-xs text-muted-foreground">
                  {category.description}
                </span>
                <br />
                <span className="text-xs text-muted-foreground">
                  <Timer className="inline w-3 h-3" /> Created{" "}
                  {moment(category.createdAt).format("MMM DD, YYYY HH:mm:ss")}
                </span>
                <br />
                <span className="text-xs text-muted-foreground">
                  <Timer className="inline w-3 h-3" /> Updated{" "}
                  {moment(category.updatedAt).format("MMM DD, YYYY HH:mm:ss")}
                </span>
              </td>
              <td className="p-4 text-xs text-center">
                {category._count.products} Products
              </td>
              <td className="p-4 text-sm text-center leading-5">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs w-full mb-1"
                >
                  <PenBox className="w-3 h-3" />
                  Update
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs w-full mb-1"
                >
                  <Eye className="w-3 h-3" />
                  Details
                </Button>
                <Button variant="outline" size="sm" className="text-xs w-full">
                  <Trash className="w-3 h-3" />
                  Delete
                </Button>
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};

export default CategoryTable;
