import { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ProductQueryParams } from "@/helpers/request/products.request.query";
import { VariantQueryParams } from "@/helpers/request/variants.request.query";

const SearchOptions = ({
  query,
}: {
  query: {
    value: VariantQueryParams;
    setValue: Dispatch<SetStateAction<VariantQueryParams>>;
  };
}) => {
  return (
    <Label className="flex flex-1 justify-start items-center p-2 focus:outline-0 border border-primary/5">
      <FaMagnifyingGlass />
      <input
        onChange={(e) =>
          query.setValue((prev) => ({
            ...prev,
            productName: e.target.value || undefined,
            cursor: undefined,
          }))
        }
        className="border-none focus:outline-0 flex-1"
        placeholder="Search..."
      />
    </Label>
  );
};

export default SearchOptions;
