"use client";
import { Label } from "@/components/ui/label";
import { FaMagnifyingGlass } from "react-icons/fa6";
import GenderOptions from "@/app/(root)/(index)/collections/[slug]/_components/query-options/gender";
import SortOptions from "@/app/(root)/(index)/collections/[slug]/_components/query-options/sort";
import PriceOptions from "@/app/(root)/(index)/collections/[slug]/_components/query-options/price";
import OrderOptions from "@/app/(root)/(index)/collections/[slug]/_components/query-options/order";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dispatch, SetStateAction, useState } from "react";
import { ProductQueryParams } from "@/helpers/request/products.request.query";

const CollectionQuery = ({
  query,
}: {
  query: {
    value: ProductQueryParams;
    setValue: Dispatch<SetStateAction<ProductQueryParams>>;
  };
}) => {
  return (
    <div className="w-full flex justify-center flex-col items-stretch p-4">
      <div className="flex justify-center gap-1 items-center border-primary/5">
        <Label className="mr-auto flex-1 flex justify-start items-center p-3 focus:outline-0 border border-primary/5">
          <FaMagnifyingGlass />
          <input
            onChange={(e) =>
              query.setValue((prev) => ({
                ...prev,
                q: e.target.value || undefined,
                cursor: undefined,
              }))
            }
            className="border-none focus:outline-0 flex-1"
            placeholder="Search..."
          />
        </Label>

        <div className="hidden md:flex gap-1 justify-center items-center flex-wrap">
          <PriceOptions
            query={{ value: query.value, setValue: query.setValue }}
          />
          <GenderOptions
            query={{ value: query.value, setValue: query.setValue }}
          />
          <SortOptions
            query={{ value: query.value, setValue: query.setValue }}
          />
          <OrderOptions
            query={{ value: query.value, setValue: query.setValue }}
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden h-full" variant="outline">
              <GripVertical />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-start items-stretch">
            <div className="p-4 pt-20 flex flex-col justify-start items-stretch gap-4">
              <PriceOptions
                query={{ value: query.value, setValue: query.setValue }}
              />
              <GenderOptions
                query={{ value: query.value, setValue: query.setValue }}
              />
              <SortOptions
                query={{ value: query.value, setValue: query.setValue }}
              />
              <OrderOptions
                query={{ value: query.value, setValue: query.setValue }}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CollectionQuery;
