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
import { productSortBy, ProductSortBy } from "@/helpers/type/product.type";
import { VariantQueryParams } from "@/helpers/request/variants.request.query";
import { variantSortBy, VariantSortBy } from "@/helpers/type/variant.type";
import { OrderQueryParams } from "@/helpers/request/orders.request.query";
import { orderSortBy, OrderSortBy } from "@/helpers/type/order.type";

const SortOptions = ({
  query,
}: {
  query: {
    value: OrderQueryParams;
    setValue: Dispatch<SetStateAction<OrderQueryParams>>;
  };
}) => {
  return (
    <Select
      defaultValue={query.value.sort}
      onValueChange={(value: OrderSortBy) =>
        query.setValue((prev) => ({
          ...prev,
          sort: value,
          cursor: undefined,
        }))
      }
    >
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          {orderSortBy.map(
            (item: { name: string; value: OrderSortBy }, index: number) => (
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

export default SortOptions;
