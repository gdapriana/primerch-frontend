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
import { ProductQueryParams } from "@/helpers/request/products.request.query";

const SortOptions = ({
  query,
}: {
  query: {
    value: ProductQueryParams;
    setValue: Dispatch<SetStateAction<ProductQueryParams>>;
  };
}) => {
  return (
    <Select
      defaultValue={query.value.sort}
      onValueChange={(value: ProductSortBy) =>
        query.setValue((prev) => ({
          ...prev,
          sort: value,
          cursor: undefined,
        }))
      }
    >
      <SelectTrigger className="md:w-auto w-full md:max-w-[200px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          {productSortBy.map(
            (item: { name: string; value: ProductSortBy }, index: number) => (
              <SelectItem key={index} value={item.value}>
                {item.name}
              </SelectItem>
            ),
          )}
          <SelectItem value="default">Default</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortOptions;
