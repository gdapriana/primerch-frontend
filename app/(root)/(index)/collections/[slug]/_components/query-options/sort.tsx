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

const SortOptions = ({
  sort,
}: {
  sort: {
    value: ProductSortBy | undefined;
    setValue: Dispatch<SetStateAction<ProductSortBy | undefined>>;
  };
}) => {
  return (
    <Select
      value={sort.value}
      onValueChange={(value: ProductSortBy) =>
        sort.setValue(value === "default" ? undefined : value)
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
