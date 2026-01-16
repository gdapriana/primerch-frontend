"use client";
import SearchOptions from "@/app/(root)/(admin)/admin/products/_components/query-options/search";
import { useState } from "react";
import SortOptions from "@/app/(root)/(admin)/admin/products/_components/query-options/sort";
import GenderOptions from "@/app/(root)/(admin)/admin/products/_components/query-options/gender";
import PriceOptions from "@/app/(root)/(admin)/admin/products/_components/query-options/price";
import ProductTable from "@/app/(root)/(admin)/admin/products/_components/table";
import { useProducts } from "@/helpers/context/query/products.query.hook";
import { ProductQueryParams } from "@/helpers/request/products.request.query";
import OrderOptions from "@/app/(root)/(admin)/admin/products/_components/query-options/order";
import ProductQuerySheet from "@/app/(root)/(admin)/admin/products/_components/query-sheet";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [query, setQuery] = useState<ProductQueryParams>({
    take: 10,
    sort: "createdAt",
    order: "desc",
    minPrice: 0,
    maxPrice: 500,
  });

  const { data, isLoading } = useProducts(query);

  return (
    <main className="flex flex-col justify-between h-full items-stretch">
      <div className="p-4 flex justify-start gap-2 items-center border-b border-primary/5">
        <SearchOptions query={{ value: query, setValue: setQuery }} />
        <div className="md:flex gap-1 md:w-full items-center hidden">
          <PriceOptions query={{ value: query, setValue: setQuery }} />
          <GenderOptions query={{ value: query, setValue: setQuery }} />
          <SortOptions query={{ value: query, setValue: setQuery }} />
          <OrderOptions query={{ value: query, setValue: setQuery }} />
        </div>
        <ProductQuerySheet>
          <PriceOptions query={{ value: query, setValue: setQuery }} />
          <GenderOptions query={{ value: query, setValue: setQuery }} />
          <SortOptions query={{ value: query, setValue: setQuery }} />
          <OrderOptions query={{ value: query, setValue: setQuery }} />
        </ProductQuerySheet>
        <Button asChild>
          <Link href={`/admin/products/create`}>
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {data && <ProductTable products={data.result.items} />}
      </div>
      <div className="p-4 border-t border-primary/5 flex justify-between items-center">
        {!isLoading && data && (
          <span className="text-xs text-muted-foreground">
            {data.result.pagination.totalAll} Products
          </span>
        )}
        {!isLoading && data && (
          <Button
            size="sm"
            disabled={!data.result.pagination.hasNext}
            className="text-xs"
            onClick={() =>
              setQuery((prev) => ({
                ...prev,
                cursor: data.result.pagination.nextCursor,
              }))
            }
          >
            Next Page <ArrowRight />
          </Button>
        )}
      </div>
    </main>
  );
};

export default Page;
