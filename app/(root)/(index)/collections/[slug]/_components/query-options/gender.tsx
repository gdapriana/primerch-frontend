"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GENDER } from "@/helpers/generated/prisma/enums";
import { Dispatch, SetStateAction } from "react";
import { ProductQueryParams } from "@/helpers/request/products.request.query";

const GenderOptions = ({
  query,
}: {
  query: {
    value: ProductQueryParams;
    setValue: Dispatch<SetStateAction<ProductQueryParams>>;
  };
}) => {
  return (
    <Select
      defaultValue={"ALL"}
      onValueChange={(value) =>
        query.setValue((prev) => ({
          ...prev,
          ...(value &&
            value !== "ALL" && {
              gender: value as GENDER,
            }),
          cursor: undefined,
        }))
      }
    >
      <SelectTrigger className="md:w-auto w-full md:max-w-[200px]">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          {Object.values(GENDER).map((item) => {
            return (
              <SelectItem className="capitalize" value={item}>
                {item}
              </SelectItem>
            );
          })}
          <SelectItem className="lowercase" value={"ALL"}>
            ALL
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GenderOptions;
