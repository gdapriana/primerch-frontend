"use client";
import CustomBreadcum from "@/components/breadcum";
import { Button } from "@/components/ui/button";
import { CategoryRequest } from "@/helpers/request/category.request";
import { CategoryQueryWithRelation } from "@/helpers/type/category.type";
import { Response } from "@/helpers/type/response.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState<CategoryQueryWithRelation[]>();
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response: Response = await CategoryRequest.QUERY(query, {
        loadingValue: categoriesLoading,
        setLoadingValue: setCategoriesLoading,
      });
      setCategories(response.data.result.items);
      setPagination(response.data.result.pagination);
    })();
  }, []);

  return (
    <main className="w-full h-full max-w-5xl grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-1 md:grid-rows-[auto_1fr]">
      <header className="border-b border-primary/5 p-4 flex justify-between items-center">
        <CustomBreadcum
          data={[
            { name: "Home", url: "/" },
            { name: "Collections", url: "/collections" },
          ]}
        />
      </header>

      {!categoriesLoading && categories && categories.length !== 0 && (
        <div className="p-4 grid grid-cols-2 gap-4 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((category: CategoryQueryWithRelation) => {
            return (
              <Link
                href={`/collections/${category.slug}`}
                className="md:h-120 h-80 group relative flex"
                key={category.id}
              >
                {category.cover?.url && (
                  <Image
                    src={category.cover.url}
                    alt={`cover ${category.name}`}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full z-10 h-full object-cover absolute top-0 left-0"
                  />
                )}

                <div className="absolute z-15 transition left-0 top-0 w-full h-full group-hover:bg-black/40"></div>

                <div className="absolute z-20 bottom-0 left-0 w-full">
                  <div className="p-4 flex flex-wrap justify-between gap-2 items-start">
                    <h3 className="text-base text-white md:text-lg font-bold uppercase">
                      {category.name}
                    </h3>
                    <Button size="sm" variant="outline">
                      {category._count.products} Products
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
