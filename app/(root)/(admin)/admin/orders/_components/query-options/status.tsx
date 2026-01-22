import { OrderQueryParams } from "@/helpers/request/orders.request.query";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUS, PAYMENT_METHOD } from "@/helpers/generated/prisma/enums";

const StatusOptions = ({
  query,
}: {
  query: {
    value: OrderQueryParams;
    setValue: Dispatch<SetStateAction<OrderQueryParams>>;
  };
}) => {
  return (
    <Select
      defaultValue={"ALL"}
      onValueChange={(value: ORDER_STATUS | "ALL") =>
        query.setValue((prev) => ({
          ...prev,
          status: value !== "ALL" ? value : undefined,
          cursor: undefined,
        }))
      }
    >
      <SelectTrigger className="flex-1 text-xs">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {Object.values(ORDER_STATUS).map((item: string, index: number) => (
            <SelectItem key={index} value={item} className="text-xs">
              {item}
            </SelectItem>
          ))}
          <SelectItem value={"ALL"} className="text-xs">
            Status (all)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusOptions;
