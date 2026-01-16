"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/helpers/context/cart/cart.hook";
import { CartRequest } from "@/helpers/request/cart.request";
import { CartWithRelation } from "@/helpers/type/cart.type";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function DeleteProductCartAlert({
  productInCart,
  setSheetOpen,
}: {
  productInCart: CartWithRelation["products"][number];
  setSheetOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { cartRefresh, setCartRefresh } = useCart();
  const [loadingDeleteProduct, setLoadingDeleteProduct] =
    useState<boolean>(false);
  const onDelete = () => {
    toast.promise(
      (async () => {
        setCartRefresh(true);
        setSheetOpen(false);
        await CartRequest.DELETE_PRODUCT(productInCart.id, {
          loadingValue: loadingDeleteProduct,
          setLoadingValue: setLoadingDeleteProduct,
        });
      })(),
      {
        success: "Delete product from cart success",
        loading: "Loading...",
        error: "Something went wrong",
        finally: () => {
          setCartRefresh(false);
          setSheetOpen(true);
        },
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-6 h-6 flex justify-center items-center">
          <Trash className="w-2 h-2" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete item in cart</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Are you sure to delete {productInCart.variant?.product.name} from
          cart?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loadingDeleteProduct}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete()}
            disabled={loadingDeleteProduct}
          >
            {loadingDeleteProduct ? "Loading..." : "Yes"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
