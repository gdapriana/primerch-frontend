import { PageProps } from "@/helpers/type/random.type";
import ProductsWrapper from "@/app/(root)/(index)/products/_components/products-wrapper";
import { CategoryQueryWithRelation } from "@/helpers/type/category.type";
import { CategoryRequest } from "@/helpers/request/category.request";

export default async function Page({ searchParams }: PageProps) {
  const categories: CategoryQueryWithRelation[] = (
    await CategoryRequest.QUERY()
  ).data.result.items;

  return <ProductsWrapper categories={categories} />;
}
