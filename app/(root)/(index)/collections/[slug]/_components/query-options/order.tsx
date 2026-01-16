import { productSortBy, ProductSortBy } from "@/helpers/type/product.type";
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
import { orderBy, OrderBy } from "@/helpers/type/random.type";

const OrderOptions = ({
  order,
}: {
  order: {
    value: OrderBy;
    setValue: Dispatch<SetStateAction<OrderBy>>;
  };
}) => {
  return (
    <Select
      value={order.value}
      onValueChange={(value: OrderBy) => order.setValue(value)}
    >
      <SelectTrigger className="md:w-auto w-full md:max-w-[200px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          {orderBy.map(
            (item: { name: string; value: OrderBy }, index: number) => (
              <SelectItem key={index} value={item.value}>
                {item.name}
              </SelectItem>
            ),
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderOptions;
