"use client";
import ProductCart from "@/app/(root)/_components/cart/product";
import NoItem from "@/components/no-item";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/helpers/context/auth/auth.hook";
import { CartRequest } from "@/helpers/request/cart.request";
import { CartWithRelation } from "@/helpers/type/cart.type";
import { Response } from "@/helpers/type/response.type";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCart } from "react-icons/bs";

export default function Cart() {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const { isAuthenticated, loading, user } = useAuth();
  const [cart, setCart] = useState<CartWithRelation>();
  const [fetchCartLoading, setFetchCartLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (sheetOpen) {
      if (!loading && !isAuthenticated) router.push("/login");
    }
  }, [sheetOpen, loading, router]);

  useEffect(() => {
    const fetchCart = async () => {
      setFetchCartLoading(true);
      const response: Response = await CartRequest.GET({
        loadingValue: fetchCartLoading,
        setLoadingValue: setFetchCartLoading,
      });
      setCart(response.data.result.item);
    };

    if (sheetOpen && isAuthenticated) fetchCart();
  }, [isAuthenticated, sheetOpen]);

  return (
    <Sheet open={sheetOpen} onOpenChange={() => setSheetOpen(!sheetOpen)}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon-lg">
          {loading ? <Spinner /> : <BsCart />}
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <div className="h-dvh flex flex-col justify-start items-stretch">
          <SheetHeader>
            <SheetTitle>
              Your Cart <br />
              {user?.email}
            </SheetTitle>
          </SheetHeader>
          {fetchCartLoading && (
            <div className="p-4 flex-1 flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {!cart && (
            <div className="p-4 flex-1 gap-4 text-sm flex-col flex justify-center items-center">
              No cart found!
            </div>
          )}
          {cart && cart.products.length === 0 && (
            <NoItem
              style={{
                icon: "w-6 h-6",
                container: "w-full flex-1 flex justify-center items-center",
              }}
              button={{ text: "Shop Now", url: "/products" }}
              title="No product in cart"
              Icon={CircleAlert}
            />
          )}
          {cart && cart.products.length !== 0 && (
            <>
              <div className="p-4 overflow-auto flex-1 flex-col flex justify-start items-stretch">
                {cart.products.map((product, index: number) => (
                  <ProductCart
                    setSheetOpen={setSheetOpen}
                    product={product}
                    key={index}
                  />
                ))}
              </div>
              <div className="p-4 flex justify-center items-stretch flex-col">
                <Button onClick={() => setSheetOpen(false)} asChild>
                  <Link href="/checkout">
                    Confirmation <BsCart />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
