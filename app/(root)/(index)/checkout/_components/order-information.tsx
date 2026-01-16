"use client";

import { Order } from "@/helpers/generated/prisma/client";

export default function OrderInformation({
  orderInformation,
}: {
  orderInformation: {
    value?: Order;
  };
}) {
  return (
    <div className="p-4 w-full relative border border-primary/5 md:max-w-sm flex justify-start flex-col items-start gap-4">
      {!orderInformation.value && (
        <div className="absolute top-0 left-0 w-full h-full bg-background/50"></div>
      )}
      <header className="flex">
        <h3 className="font-semibold">Your Order Information</h3>
      </header>

      <div className="flex flex-col justify-start items-stretch w-full gap-3">
        <div className="flex justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">Shipping Fee</p>
          <div className="flex-1 border-b border-dashed"></div>
          <p className="text-sm">
            ${orderInformation?.value?.shippingFee.toString()}
          </p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">Subtotal</p>
          <div className="flex-1 border-b border-dashed"></div>
          <p className="text-sm">
            $
            {orderInformation?.value?.subtotal
              ? Number(orderInformation?.value.subtotal).toFixed(2)
              : "0"}
          </p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <p className="text-sm font-semibold">Total</p>
          <div className="flex-1 border-b border-dashed"></div>
          <p className="text-sm font-semibold">
            $
            {orderInformation?.value?.total
              ? Number(orderInformation?.value.total).toFixed(2)
              : "0"}
          </p>
        </div>
      </div>
    </div>
  );
}
