"use client";
import { useState } from "react";
import { OrderQueryParams } from "@/helpers/request/orders.request.query";
import { useOrders } from "@/helpers/context/query/orders.query.hook";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusIcon } from "lucide-react";
import OrderTable from "@/app/(root)/(admin)/admin/orders/_components/table";
import SearchOptions from "@/app/(root)/(admin)/admin/orders/_components/query-options/search";
import SortOptions from "@/app/(root)/(admin)/admin/orders/_components/query-options/sort";
import OrderOptions from "@/app/(root)/(admin)/admin/orders/_components/query-options/order";
import OrderQuerySheet from "@/app/(root)/(admin)/admin/orders/_components/query-sheet";
import PaymentMethodOptions from "@/app/(root)/(admin)/admin/orders/_components/query-options/payment-method";
import StatusOptions from "@/app/(root)/(admin)/admin/orders/_components/query-options/status";
import Link from "next/link";

const Page = () => {
  const [query, setQuery] = useState<OrderQueryParams>({
    take: 10,
    sort: "createdAt",
    order: "desc",
  });

  const { data, isLoading, refetch } = useOrders(query);

  return (
    <main className="flex flex-col justify-between h-full items-stretch">
      <div className="p-4 flex justify-start gap-2 items-center border-b border-primary/5">
        <SearchOptions query={{ value: query, setValue: setQuery }} />
        <div className="md:flex gap-1 md:w-full items-center hidden">
          <StatusOptions query={{ value: query, setValue: setQuery }} />
          <PaymentMethodOptions query={{ value: query, setValue: setQuery }} />
          <SortOptions query={{ value: query, setValue: setQuery }} />
          <OrderOptions query={{ value: query, setValue: setQuery }} />
        </div>
        <OrderQuerySheet>
          <StatusOptions query={{ value: query, setValue: setQuery }} />
          <PaymentMethodOptions query={{ value: query, setValue: setQuery }} />
          <SortOptions query={{ value: query, setValue: setQuery }} />
          <OrderOptions query={{ value: query, setValue: setQuery }} />
        </OrderQuerySheet>
      </div>
      <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {data && <OrderTable refetch={refetch} orders={data.result.items} />}
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
