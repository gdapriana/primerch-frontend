"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ProductQueryParams } from "@/helpers/request/products.request.query";

const PriceOptions = ({
  query,
}: {
  query: {
    value: ProductQueryParams;
    setValue: Dispatch<SetStateAction<ProductQueryParams>>;
  };
}) => {
  const [isValueChanged, setIsValueChanged] = useState<boolean>(false);

  return (
    <div className="flex relative flex-col gap-2 w-full px-3">
      <div
        className={cn(
          "absolute invisible opacity-0 transition duration-500 z-10 top-[-35px] left-1/2 translate-x-[-50%] bg-primary flex justify-center items-center text-xs py-0 px-1 text-background",
          isValueChanged && "visible transition opacity-100",
        )}
      >
        ${query.value.minPrice} - ${query.value.maxPrice}
      </div>
      <Slider
        value={[query.value.minPrice || 0, query.value.maxPrice || 500]}
        onValueChange={(value) => {
          query.setValue((prev) => ({
            ...prev,
            minPrice: value[0],
            maxPrice: value[1],
            cursor: undefined,
          }));

          setIsValueChanged(true);
          setTimeout(() => setIsValueChanged(false), 2000);
        }}
        min={0}
        max={500}
        step={10}
        className="w-full"
      />
    </div>
  );
};

export default PriceOptions;
