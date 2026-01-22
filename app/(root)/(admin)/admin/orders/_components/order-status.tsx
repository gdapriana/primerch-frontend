import React from "react";
import { ORDER_STATUS } from "@/helpers/generated/prisma/enums";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Response } from "@/helpers/type/response.type";
import { OrderRequest } from "@/helpers/request/order.request";
import { QueryObserverResult, RefetchOptions } from "@tanstack/query-core";

const UpdateOrderStatus = ({
  refetch,
  currentStatus,
  orderId,
}: {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
  currentStatus: ORDER_STATUS;
  orderId: string;
}) => {
  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={(value: ORDER_STATUS) => {
        toast.promise(
          (async () => {
            const response: Response = await OrderRequest.UPDATE_ORDER_STATUS(
              { status: value },
              orderId,
            );
            if (!response.success)
              throw new Error("Error updating order status");
            return response;
          })(),
          {
            success: "Status Updated",
            loading: "Loading...",
            error: (e) => e.message,
            finally: () => {
              refetch().then();
            },
          },
        );
      }}
    >
      <SelectTrigger className="w-full mb-2 text-xs">
        <SelectValue placeholder="Update status" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {Object.values(ORDER_STATUS).map((item: string, index: number) => (
            <SelectItem key={index} value={item} className="text-xs">
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UpdateOrderStatus;
