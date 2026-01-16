"use client";

import ProductCard from "@/app/(root)/(index)/checkout/_components/product-card";
import NoItem from "@/components/no-item";
import { useCart } from "@/helpers/context/cart/cart.hook";
import { CartRequest } from "@/helpers/request/cart.request";
import { CartWithRelation } from "@/helpers/type/cart.type";
import { Response } from "@/helpers/type/response.type";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrderProducts() {
  const { cartRefresh } = useCart();
  const [cart, setCart] = useState<CartWithRelation>();

  useEffect(() => {
    (async () => {
      const cart: Response = await CartRequest.GET();
      setCart(cart.data.result.item);
    })();
  }, [cartRefresh]);

  return (
    <div className="w-full gap-2 flex flex-col justify-start items-stretch">
      <div className="flex mb-4 justify-between items-center">
        <h1 className="font-bold">Order Confirmation</h1>
        <p className="text-muted-foreground">
          {cart?.products.length} products
        </p>
      </div>
      {cart && cart.products.length === 0 && (
        <NoItem
          style={{ container: "h-[20rem]" }}
          title="No product to confirmation"
          description="Add some products first to cart to confirmation"
          button={{ text: "Shop Now", url: "/products" }}
          Icon={CircleAlert}
        />
      )}
      {cart &&
        cart.products.map((product: CartWithRelation["products"][number]) => (
          <ProductCard product={product} key={product.id} />
        ))}
    </div>
  );
}
