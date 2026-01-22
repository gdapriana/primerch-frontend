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
import { PAYMENT_METHOD } from "@/helpers/generated/prisma/enums";

const PaymentMethodOptions = ({
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
      onValueChange={(value: PAYMENT_METHOD | "ALL") =>
        query.setValue((prev) => ({
          ...prev,
          paymentMethod: value !== "ALL" ? value : undefined,
          cursor: undefined,
        }))
      }
    >
      <SelectTrigger className="flex-1 text-xs">
        <SelectValue placeholder="Payment Method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Payment Methods</SelectLabel>
          {Object.values(PAYMENT_METHOD).map((item: string, index: number) => (
            <SelectItem key={index} value={item} className="text-xs">
              {item}
            </SelectItem>
          ))}
          <SelectItem value={"ALL"} className="text-xs">
            Payment Method (all)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PaymentMethodOptions;
