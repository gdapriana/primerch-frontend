"use client";
import { useState } from "react";
import { VariantQueryParams } from "@/helpers/request/variants.request.query";
import { useVariants } from "@/helpers/context/query/variants.query.hook";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, PlusIcon } from "lucide-react";
import SearchOptions from "@/app/(root)/(admin)/admin/variants/_components/query-options/search";
import SortOptions from "@/app/(root)/(admin)/admin/variants/_components/query-options/sort";
import OrderOptions from "@/app/(root)/(admin)/admin/variants/_components/query-options/order";
import VariantQuerySheet from "@/app/(root)/(admin)/admin/variants/_components/query-sheet";
import VariantTable from "@/app/(root)/(admin)/admin/variants/_components/table";

const Page = () => {
  const [query, setQuery] = useState<VariantQueryParams>({
    take: 10,
    sort: "createdAt",
    order: "desc",
  });

  const { data, isLoading } = useVariants(query);

  return (
    <main className="flex flex-col justify-between h-full items-stretch">
      <div className="p-4 flex justify-start gap-2 items-center border-b border-primary/5">
        <SearchOptions query={{ value: query, setValue: setQuery }} />
        <div className="md:flex gap-1 md:w-full items-center hidden">
          <SortOptions query={{ value: query, setValue: setQuery }} />
          <OrderOptions query={{ value: query, setValue: setQuery }} />
        </div>
        <VariantQuerySheet>
          <SortOptions query={{ value: query, setValue: setQuery }} />
          <OrderOptions query={{ value: query, setValue: setQuery }} />
        </VariantQuerySheet>
        <Button asChild>
          <Link href={`/admin/products/create`}>
            <PlusIcon />
          </Link>
        </Button>
      </div>
      <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {data && <VariantTable variants={data.result.items} />}
      </div>
      <div className="p-4 border-t border-primary/5 flex justify-between items-center">
        {!isLoading && data && (
          <span className="text-xs text-muted-foreground">
            {data.result.pagination.totalAll} Variants
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
