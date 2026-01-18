"use client";
import CustomBreadcum from "@/components/breadcum";
import {
  ProductQueryWithRelation,
  ProductSortBy,
} from "@/helpers/type/product.type";
import ProductCard from "@/app/(root)/(index)/products/_components/product-card";
import SearchOptions from "@/app/(root)/(index)/products/_components/query-options/search";
import PriceOptions from "@/app/(root)/(index)/products/_components/query-options/price";
import { useState } from "react";
import { OrderBy } from "@/helpers/type/random.type";
import { GENDER } from "@/helpers/generated/prisma/enums";
import GenderOptions from "@/app/(root)/(index)/products/_components/query-options/gender";
import SortOptions from "@/app/(root)/(index)/products/_components/query-options/sort";
import OrderOptions from "@/app/(root)/(index)/products/_components/query-options/order";
import { CategoryQueryWithRelation } from "@/helpers/type/category.type";
import CategoryOptions from "@/app/(root)/(index)/products/_components/query-options/category";
import { ProductQueryParams } from "@/helpers/request/products.request.query";
import { useProducts } from "@/helpers/context/query/products.query.hook";
import { Button } from "@/components/ui/button";

const ProductsWrapper = ({
  categories,
}: {
  categories: CategoryQueryWithRelation[];
}) => {
  const [query, setQuery] = useState<ProductQueryParams>({
    take: 9,
    sort: "createdAt",
    order: "desc",
    minPrice: 0,
    maxPrice: 500,
  });

  const { data, isLoading } = useProducts(query);

  return (
    <main className="w-full h-full max-w-5xl grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[3fr_1fr] md:grid-rows-[auto_1fr]">
      <header className="border-b border-primary/5 p-4 flex justify-between items-center">
        <CustomBreadcum
          data={[
            { name: "Home", url: "/" },
            { name: "Products", url: "/products" },
          ]}
        />
        <SearchOptions query={{ value: query, setValue: setQuery }} />
      </header>
      <aside className="md:row-span-2 border-l border-primary/5 flex-col justify-start items-stretch hidden md:flex">
        <div className="flex justify-center p-4 border-b border-primary/5 items-center">
          <p className="text-sm">Search Options</p>
        </div>
        <div className="flex p-4 pt-14 flex-col justify-start items-stretch gap-3">
          <PriceOptions query={{ value: query, setValue: setQuery }} />
          <GenderOptions query={{ value: query, setValue: setQuery }} />
          <SortOptions query={{ value: query, setValue: setQuery }} />
          <OrderOptions query={{ value: query, setValue: setQuery }} />
          <CategoryOptions
            query={{ value: query, setValue: setQuery }}
            categories={categories}
          />
        </div>
      </aside>
      <div className="p-4 gap-1 overflow-auto grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {!isLoading &&
          data &&
          data.result.items.map((product: ProductQueryWithRelation) => (
            <ProductCard key={product.id} product={product} />
          ))}
        <div className="p-4 col-span-3 flex justify-center items-center">
          {data && data.result.pagination.hasNext && (
            <Button
              size="sm"
              className="text-xs cursor-pointer"
              onClick={() =>
                setQuery((prev) => ({
                  ...prev,
                  ...(prev.take && {
                    take: prev.take + 9,
                  }),
                  cursor: undefined,
                }))
              }
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductsWrapper;
