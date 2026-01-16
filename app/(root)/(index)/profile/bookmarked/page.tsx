"use client";
import ProductCard from "@/app/(root)/(index)/products/_components/product-card";
import CustomBreadcum from "@/components/breadcum";
import NoItem from "@/components/no-item";
import { BookmarkRequest } from "@/helpers/request/bookmark.request";
import { ProductQueryWithRelation } from "@/helpers/type/product.type";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<ProductQueryWithRelation[]>();

  useEffect(() => {
    (async () => {
      const response = await BookmarkRequest.QUERY();
      setProducts(response.data.result.items);
    })();
  }, []);

  return (
    <div className="mt-10 md:pr-4 gap-4 md:mt-5 flex flex-col justify-start items-stretch">
      <header className="flex justify-start items-center">
        <CustomBreadcum
          data={[
            { name: "Profile", url: "/profile" },
            { name: "Bookmarked Products", url: "/profile/bookmarked" },
          ]}
        />
      </header>

      {!products ||
        (products.length === 0 && (
          <NoItem
            title="No Products Found"
            style={{ container: "h-[300px]", title: "text-sm" }}
            description="Bookmark some products by clicking bookmark icon in product details"
            button={{ text: "Start Shoping", url: "/products" }}
            Icon={CircleAlert}
          />
        ))}

      <div className="gap-y-10 md:gap-y-10 overflow-auto grid grid-cols-2 md:grid-cols-3 sm:grid-cols-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {products &&
          products.map((product: ProductQueryWithRelation) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
