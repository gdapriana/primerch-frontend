"use client";

import { Response } from "@/helpers/type/response.type";
import { ProductQueryWithRelation } from "@/helpers/type/product.type";
import { useEffect, useState } from "react";
import { ProductRequest } from "@/helpers/request/product.request";
import ProductCard from "@/app/(root)/(index)/products/_components/product-card";
import Spinner from "@/components/ui/spinner";
import NoItem from "@/components/no-item";
import { ScreenShareOff } from "lucide-react";
import CollectionQuery from "@/app/(root)/(index)/collections/[slug]/_components/collection-query";
import { PaginationType } from "@/helpers/type/pagination.type";

const CollectionProducts = ({ categorySlug }: { categorySlug: string }) => {
  const [products, setProducts] = useState<ProductQueryWithRelation[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState<PaginationType>();
  useEffect(() => {
    (async () => {
      const response: Response = await ProductRequest.QUERY(
        `category=${categorySlug}`,
        { loadingValue: productsLoading, setLoadingValue: setProductsLoading },
      );
      setProducts(response.data.result.items);
      setPagination(response.data.result.pagination);
    })();
  }, []);
  return (
    <div className="w-full flex flex-col justify-start items-stretch">
      <CollectionQuery />
      {productsLoading && (
        <div className="w-full h-[100px] py-10 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!productsLoading && products && products.length > 0 && (
        <div className="p-4 gap-1 gap-y-10 md:gap-y-10 overflow-auto grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.map((product: ProductQueryWithRelation) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {!productsLoading && products && products.length === 0 && (
        <div className="w-full h-[200px] py-10 flex justify-center items-center">
          <NoItem
            title="No Product Found"
            Icon={ScreenShareOff}
            description="No products found for this collections"
          />
        </div>
      )}
    </div>
  );
};

export default CollectionProducts;
