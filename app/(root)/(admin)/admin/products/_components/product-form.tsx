"use client";
import { useEffect, useState } from "react";
import { Product } from "@/helpers/generated/prisma/client";
import { ProductWithRelation } from "@/helpers/type/product.type";

const ProductForm = ({
  mode,
  oldProduct,
}: {
  mode: "patch" | "post";
  oldProduct?: ProductWithRelation;
}) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (mode === "patch" && oldProduct) {
      setProduct(oldProduct);
    }
  }, [oldProduct, mode]);

  return <div></div>;
};

export default ProductForm;
