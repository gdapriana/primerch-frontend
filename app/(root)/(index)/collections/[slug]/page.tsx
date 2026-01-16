import CustomBreadcum from "@/components/breadcum";
import { CategoryRequest } from "@/helpers/request/category.request";
import { CategoryWithRelation } from "@/helpers/type/category.type";
import { Response } from "@/helpers/type/response.type";
import { notFound } from "next/navigation";
import CollectionDescription from "@/app/(root)/(index)/collections/[slug]/_components/collection-description";
import CollectionProducts from "@/app/(root)/(index)/collections/[slug]/_components/collection-products";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response: Response = await CategoryRequest.GET("slug", slug);
  if (response.status !== 200) return notFound();
  const category: CategoryWithRelation = response.data.result.item;

  return (
    <main className="w-full h-full max-w-5xl flex flex-col justify-start items-stretch">
      <header className="border-b border-primary/5 p-4 flex justify-between items-center">
        <CustomBreadcum
          data={[
            { name: "Home", url: "/" },
            { name: "Collections", url: "/collections" },
            { name: category.name, url: `/collections/${category.slug}` },
          ]}
        />
      </header>
      <CollectionDescription category={category} />
      <CollectionProducts categorySlug={category.slug} />
    </main>
  );
}
