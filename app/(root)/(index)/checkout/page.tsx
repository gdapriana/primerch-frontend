"use client";
import OrderForm from "@/app/(root)/(index)/checkout/_components/order-form";
import OrderInformation from "@/app/(root)/(index)/checkout/_components/order-information";
import OrderProducts from "@/app/(root)/(index)/checkout/_components/order-products";
import { useCart } from "@/helpers/context/cart/cart.hook";
import { Order } from "@/helpers/generated/prisma/client";
import { OrderRequest } from "@/helpers/request/order.request";
import { Response } from "@/helpers/type/response.type";
import { useEffect, useState } from "react";

export default function Page() {
  const { cartRefresh } = useCart();
  const [orderInformation, setOrderInformation] = useState<Order>();
  const [orderInformationLoading, setOrderInformationLoading] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response: Response = await OrderRequest.GET_ORDER_INFORMATION({
        loadingValue: orderInformationLoading,
        setLoadingValue: setOrderInformationLoading,
      });
      setOrderInformation(response.data.result.item);
    })();
  }, [cartRefresh]);

  return (
    <main className="w-full flex justify-center items-center p-4">
      <div className="w-full gap-8 max-w-5xl flex flex-col justify-start items-stretch md:flex-row md:justify-center md:items-start">
        <div className="flex-1">
          <OrderProducts />
        </div>
        <div className="flex md:sticky gap-4 md:top-8 md:w-80 flex-col justify-start items-stretch">
          <OrderInformation orderInformation={{ value: orderInformation }} />
          <OrderForm orderInformation={{ value: orderInformation }} />
        </div>
      </div>
    </main>
  );
}
