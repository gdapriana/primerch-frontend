"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CategoryCoverDropzone from "@/app/(root)/(admin)/admin/categories/create/_components/cover-dropzone";
import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUploadSingleImage } from "@/helpers/context/query/upload.query.hook";
import { CategoryBodyRequest } from "@/helpers/request/categories.request.query";
import { usePostCategory } from "@/helpers/context/query/categories.query.hook";
import { toast } from "sonner";
import { AxiosError } from "axios";

const Page = () => {
  const [cover, setCover] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate: mutateMedia, isPending: isPendingMedia } =
    useUploadSingleImage();

  const { mutate: mutateCategory, isPending: isPendingCategory } =
    usePostCategory();

  const [categoryBody, setCategoryBody] = useState<CategoryBodyRequest>({
    name: "",
    description: undefined,
    coverId: undefined,
  });

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!cover) {
      mutateCategory(categoryBody, {
        onError: (e) => {
          if (e instanceof AxiosError)
            toast.error(JSON.stringify(e.response?.data.details));
          else toast.error(e.message);
        },
        onSuccess: () => {
          toast.success("New category created");
          formRef.current?.reset();
          setCover(null);
        },
      });
      return;
    }

    mutateMedia(cover, {
      onSuccess: (res) => {
        const coverId = res?.id;
        mutateCategory(
          {
            ...categoryBody,
            coverId,
          },
          {
            onError: (e) => {
              if (e instanceof AxiosError)
                toast.error(JSON.stringify(e.response?.data.details));
              else toast.error(e.message);
            },
            onSuccess: () => {
              toast.success("New category created");
              formRef.current?.reset();
              setCover(null);
            },
          },
        );
      },
    });
  };

  return (
    <div className="p-4 pt-16 h-full flex flex-col justify-start items-stretch overflow-auto">
      <form
        ref={formRef}
        onSubmit={onFormSubmit}
        className="grid gap-4 sm:gap-7 grid-cols-1 grid-rows-[auto_auto_auto_auto] sm:grid-rows-[auto_1fr_auto] sm:grid-cols-[1fr_2fr]"
      >
        <div className="sm:row-span-3">
          <CategoryCoverDropzone cover={{ value: cover, setValue: setCover }} />
        </div>

        <label
          className="flex flex-col justify-start items-stretch gap-2"
          htmlFor="name"
        >
          <span className="text-xs">Category Name</span>
          <Input
            disabled={isPendingCategory || isPendingMedia}
            id="name"
            placeholder="Clothes, Bags..."
            className="placeholder:text-xs"
            onChange={(e) =>
              setCategoryBody((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </label>

        <label
          className="flex flex-col justify-start items-stretch gap-2"
          htmlFor="description"
        >
          <span className="text-xs">Category Description</span>
          <Textarea
            disabled={isPendingCategory || isPendingMedia}
            id="description"
            placeholder="Darling you look perfect tonight!..."
            className="placeholder:text-xs h-full"
            onChange={(e) =>
              setCategoryBody((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </label>
        <Button disabled={isPendingCategory || isPendingMedia} type="submit">
          Create
        </Button>
      </form>
    </div>
  );
};

export default Page;
