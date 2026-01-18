"use client";
import { use } from "react";
import { useProduct } from "@/helpers/context/query/product.query.hook";
import NotFound from "next/dist/client/components/builtin/not-found";
import { useProductGallery } from "@/helpers/context/query/gallery.query.hook";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: product, isLoading: isProductLoading } = useProduct(id);
  const { data: gallery, isLoading: isGalleryLoading } = useProductGallery(id);

  console.log({ gallery });
  if (!isProductLoading && !product) return <NotFound />;
  return <div>{id}</div>;
};

export default Page;
