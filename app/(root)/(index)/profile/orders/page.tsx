"use client";

import NoItem from "@/components/no-item";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { OrderRequest } from "@/helpers/request/order.request";
import { ChevronDown, CircleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";
import { OrderWithRelation } from "@/helpers/type/order.type";
import { Badge } from "@/components/ui/badge";
import CustomBreadcum from "@/components/breadcum";

export default function Page() {
  const TAKE_PER_REFRESH: number = 5;
  const [orders, setOrders] = useState<OrderWithRelation[]>();
  const [getOrdersLoading, setGetOrdersLoading] = useState<boolean>(false);
  const [take, setTake] = useState<number>(5);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await OrderRequest.GET_USER_ORDER(take, {
        loadingValue: getOrdersLoading,
        setLoadingValue: setGetOrdersLoading,
      });
      setOrders(response.data.result.items);
      setTotalOrders(response.data.result.pagination.totalAll);
      setHasNext(response.data.result.pagination.hasNext);
    })();
  }, [take]);

  return (
    <main className="mt-10 md:pr-4 gap-4 md:mt-5 flex flex-col justify-start items-stretch">
      <header className="flex justify-between items-center">
        <CustomBreadcum
          data={[
            { name: "Profile", url: "/profile" },
            { name: "Orders", url: "#" },
          ]}
        />
        <p className="text-muted-foreground text-sm">
          {totalOrders} orders total
        </p>
      </header>

      {getOrdersLoading && <Spinner />}

      {!orders ||
        (orders.length === 0 && (
          <NoItem
            title="No Order Found"
            style={{ container: "h-[300px]", title: "text-sm" }}
            description="Add some products to cart, and click confirmation in cart, and start order"
            button={{ text: "Start Shoping", url: "/products" }}
            Icon={CircleAlert}
          />
        ))}

      {orders && orders.length !== 0 && (
        <>
          <div className="flex flex-col gap-2 justify-start items-stretch">
            {orders.map((order: OrderWithRelation) => (
              <Link
                href={`/profile/orders/${order.id}`}
                className="flex hover:bg-primary/2 justify-center border border-primary/5 p-4 items-center"
                key={order.id}
              >
                <div className="flex-1 gap-1 flex flex-col justify-center items-start">
                  <h3 className="text-sm">
                    With Name{" "}
                    <span className="font-bold">{order.fullName}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {moment(order.createdAt).fromNow()},{" "}
                    {order.paymentMethod
                      .toLowerCase()
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </p>
                  <p className="text-sm mt-2 font-semibold">
                    ${Number(order.total).toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col justify-start items-center gap-2">
                  <span className="text-muted-foreground text-xs">Status</span>
                  <Badge
                    variant={
                      order.status === "COMPLETED"
                        ? "success"
                        : order.status === "FAILED" ||
                            order.status === "CANCELLED"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {order.status
                      .toLowerCase()
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(" ")}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center">
            <Button
              disabled={!hasNext}
              onClick={() => setTake(take + TAKE_PER_REFRESH)}
              variant="outline"
            >
              Load more <ChevronDown />
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
