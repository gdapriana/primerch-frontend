import ProductDescription from "@/app/(root)/(index)/products/[slug]/_components/description";
import ProductImages from "@/app/(root)/(index)/products/[slug]/_components/images";
import Reviews from "@/app/(root)/(index)/products/[slug]/_components/reviews";
import { ProductRequest } from "@/helpers/request/product.request";
import { ProductWithRelation } from "@/helpers/type/product.type";
import { Response } from "@/helpers/type/response.type";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response: Response = await ProductRequest.GET("slug", slug);
  if (response.status !== 200) return notFound();
  const product: ProductWithRelation = response.data.result.item;

  console.log({ rating: product });

  return (
    <main className="w-full flex justify-center items-center p-8">
      <div className="w-full gap-8 max-w-5xl flex flex-col justify-start items-stretch md:flex-row md:justify-center md:items-start">
        <div className="flex-1">
          <ProductImages cover={product.cover?.url} gallery={product.gallery} />
        </div>
        <div className="flex flex-col justify-start items-stretch gap-2">
          <ProductDescription product={product} />
          <Reviews productId={product.id} avgRating={product.averageRating} />
        </div>
      </div>
    </main>
  );
}
