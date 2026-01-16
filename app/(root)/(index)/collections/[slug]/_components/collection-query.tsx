"use client";
import { Label } from "@/components/ui/label";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ProductSortBy } from "@/helpers/type/product.type";
import { GENDER } from "@/helpers/generated/prisma/enums";
import GenderOptions from "@/app/(root)/(index)/collections/[slug]/_components/query-options/gender";
import SortOptions from "@/app/(root)/(index)/collections/[slug]/_components/query-options/sort";
import PriceOptions from "@/app/(root)/(index)/collections/[slug]/_components/query-options/price";
import OrderOptions from "@/app/(root)/(index)/collections/[slug]/_components/query-options/order";
import { OrderBy } from "@/helpers/type/random.type";
import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const CollectionQuery = ({}: {}) => {
  const [q, setQ] = useState<string>("");
  const [sortBy, setSortBy] = useState<ProductSortBy>();
  const [orderBy, setOrderBy] = useState<OrderBy>("desc");
  const [gender, setGender] = useState<GENDER>("UNISEX");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [take, setTake] = useState<number>(10);

  return (
    <div className="w-full flex justify-center flex-col items-stretch p-4">
      <div className="flex justify-center gap-1 items-center border-primary/5">
        <Label className="mr-auto flex-1 flex justify-start items-center p-3 focus:outline-0 border border-primary/5">
          <FaMagnifyingGlass />
          <input
            onChange={(e) => setQ(e.target.value)}
            className="border-none focus:outline-0 flex-1"
            placeholder="Search..."
          />
        </Label>

        <div className="hidden md:flex gap-1 justify-center items-center flex-wrap">
          <PriceOptions
            price={{ value: priceRange, setValue: setPriceRange }}
          />
          <GenderOptions gender={{ value: gender, setValue: setGender }} />
          <SortOptions sort={{ value: sortBy, setValue: setSortBy }} />
          <OrderOptions order={{ value: orderBy, setValue: setOrderBy }} />
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
                price={{ value: priceRange, setValue: setPriceRange }}
              />
              <GenderOptions gender={{ value: gender, setValue: setGender }} />
              <SortOptions sort={{ value: sortBy, setValue: setSortBy }} />
              <OrderOptions order={{ value: orderBy, setValue: setOrderBy }} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CollectionQuery;
