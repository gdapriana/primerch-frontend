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
import { ProductQueryParams } from "@/helpers/request/products.request.query";
import { VariantQueryParams } from "@/helpers/request/variants.request.query";

const OrderOptions = ({
  query,
}: {
  query: {
    value: VariantQueryParams;
    setValue: Dispatch<SetStateAction<VariantQueryParams>>;
  };
}) => {
  return (
    <Select
      defaultValue={query.value.order}
      onValueChange={(value: OrderBy) =>
        query.setValue((prev) => ({
          ...prev,
          order: value,
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
