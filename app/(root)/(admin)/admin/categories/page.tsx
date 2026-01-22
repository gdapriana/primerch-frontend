"use client";
import { useCategories } from "@/helpers/context/query/categories.query.hook";
import { useState } from "react";
import { CategoryQueryParams } from "@/helpers/request/categories.request.query";
import CategoryTable from "@/app/(root)/(admin)/admin/categories/_components/table";
import SearchOptions from "@/app/(root)/(admin)/admin/categories/_components/query-options/search";
import SortOptions from "@/app/(root)/(admin)/admin/categories/_components/query-options/sort";
import OrderOptions from "@/app/(root)/(admin)/admin/categories/_components/query-options/order";
import OrderQuerySheet from "@/app/(root)/(admin)/admin/categories/_components/query-sheet";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [query, setQuery] = useState<CategoryQueryParams>({
    take: 10,
    sort: "createdAt",
    order: "desc",
  });
  const { data, isLoading, refetch } = useCategories(query);
  return (
    <main className="flex flex-col justify-between h-full items-stretch">
      <div className="p-4 flex justify-start gap-2 items-center border-b border-primary/5">
        <SearchOptions query={{ value: query, setValue: setQuery }} />
        <div className="md:flex gap-1 md:w-full items-center hidden">
          <SortOptions query={{ value: query, setValue: setQuery }} />
          <OrderOptions query={{ value: query, setValue: setQuery }} />
        </div>
        <OrderQuerySheet>
          <SortOptions query={{ value: query, setValue: setQuery }} />
          <OrderOptions query={{ value: query, setValue: setQuery }} />
        </OrderQuerySheet>

        <Button asChild>
          <Link href={`/admin/categories/create`}>
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {data && (
          <CategoryTable refetch={refetch} categories={data.result.items} />
        )}
      </div>
      <div className="p-4 border-t border-primary/5 flex justify-between items-center">
        {!isLoading && data && (
          <span className="text-xs text-muted-foreground">
            {data.result.pagination.totalAll} Orders,{" "}
            {data.result.pagination.totalFiltered} filtered
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
            Load More <ArrowRight />
          </Button>
        )}
      </div>
    </main>
  );
};

export default Page;
