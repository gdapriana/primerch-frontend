"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const PriceOptions = ({
  price,
}: {
  price: {
    value: [number, number];
    setValue: Dispatch<SetStateAction<[number, number]>>;
  };
}) => {
  const [isValueChanged, setIsValueChanged] = useState<boolean>(false);
  useEffect(() => {
    setIsValueChanged(true);
    setTimeout(() => {
      setIsValueChanged(false);
    }, 2000);
  }, [price]);

  return (
    <div className="flex relative flex-col gap-2 min-w-[180px] px-3">
      <div
        className={cn(
          "absolute invisible opacity-0 transition duration-500 z-10 top-[-35px] left-1/2 translate-x-[-50%] bg-primary flex justify-center items-center text-xs py-0 px-1 text-background",
          isValueChanged && "visible transition opacity-100",
        )}
      >
        ${price.value[0]} - ${price.value[1]}
      </div>
      <Slider
        value={price.value}
        onValueChange={(value) => price.setValue(value as [number, number])}
        min={0}
        max={1000}
        step={100}
        className="w-full"
      />
    </div>
  );
};

export default PriceOptions;
