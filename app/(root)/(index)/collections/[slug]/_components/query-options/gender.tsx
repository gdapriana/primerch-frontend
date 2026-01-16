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

const GenderOptions = ({
  gender,
}: {
  gender: { value: GENDER; setValue: Dispatch<SetStateAction<GENDER>> };
}) => {
  return (
    <Select
      value={gender.value}
      onValueChange={(value: GENDER) => gender.setValue(value)}
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
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GenderOptions;
