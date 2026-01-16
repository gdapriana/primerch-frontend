"use client";
import { use, useEffect, useState } from "react";
import { OrderRequest } from "@/helpers/request/order.request";
import { OrderDetailsWithRelation } from "@/helpers/type/order.type";
import { Response } from "@/helpers/type/response.type";
import moment from "moment";
import ProductCard from "@/app/(root)/(index)/profile/orders/[id]/_components/product-card";
import CustomBreadcum from "@/components/breadcum";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderDetailsWithRelation>();
  const [orderDetailsLoading, setOrderDetailsLoading] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response: Response = await OrderRequest.GET_USER_ORDER_DETAILS(id, {
        loadingValue: orderDetailsLoading,
        setLoadingValue: setOrderDetailsLoading,
      });

      setOrder(response.data.result.item);
    })();
  }, []);

  return (
    <div className="mt-10 md:pr-4 gap-4 md:mt-5 flex flex-col justify-start items-stretch">
      <div className="flex justify-start items-center">
        <CustomBreadcum
          data={[
            { name: "Profile", url: "/profile" },
            { name: "Orders", url: "/profile/orders" },
            { name: "Order Detail", url: "#" },
          ]}
        />
      </div>
      <div className="border py-6 border-primary/5 p-4 gap-4 flex flex-col justify-start items-stretch">
        <div className="flex justify-between gap-2 items-stretch">
          <p className="text-sm text-muted-foreground">Full Name</p>
          <div className="flex-1 border-b border-dashed"></div>
          <p className="text-sm font-semibold">{order?.fullName}</p>
        </div>
        <div className="flex justify-between gap-2 items-stretch">
          <p className="text-sm text-muted-foreground">Email</p>
          <div className="flex-1 border-b border-dashed"></div>
          <p className="text-sm font-semibold">{order?.email}</p>
        </div>
        <div className="flex justify-between gap-2 items-stretch">
          <p className="text-sm text-muted-foreground">Phone Number</p>
          <div className="flex-1 border-b border-dashed"></div>
          <p className="text-sm font-semibold">{order?.phone}</p>
        </div>
        <div className="flex justify-between gap-2 items-stretch">
          <p className="text-sm text-muted-foreground">Address</p>
          <div className="flex-1 border-b border-dashed"></div>
          <p className="text-sm font-semibold">{order?.address}</p>
        </div>
        <div className="flex justify-between gap-2 items-stretch">
          <p className="text-sm text-muted-foreground">Created</p>
          <div className="flex-1 border-b border-dashed"></div>
          <p className="text-sm font-semibold">
            {moment(order?.createdAt).format("DD MMM YYYY, h:mm:ss a")}
          </p>
        </div>
        <div className="flex justify-between gap-2 items-stretch">
          <p className="text-sm text-muted-foreground">Total</p>
          <div className="flex-1 border-b border-dashed"></div>
          <p className="text-sm font-semibold">
            ${Number(order?.total).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-start items-stretch p-4 border border-primary/5 gap-4">
        <header className="flex justify-between items-center">
          <h3 className="font-semibold text-sm">Order Products</h3>
          <span className="text-sm text-muted-foreground">
            {order?.items.length} Products
          </span>
        </header>
        <div className="flex flex-col gap-2 justify-start items-stretch">
          {order &&
            order.items &&
            order.items.map(
              (item: OrderDetailsWithRelation["items"][number]) => (
                <ProductCard
                  orderId={order.id}
                  orderStatus={order.status}
                  product={item}
                  key={item.id}
                />
              ),
            )}
        </div>
      </div>
    </div>
  );
}
