"use client";
import { OrderQueryWithRelation } from "@/helpers/type/order.type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, ImageOff } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const OrderDetail = ({
  products,
}: {
  products: OrderQueryWithRelation["items"][number][];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs mb-1 w-full">
          <Eye className="w-3 h-3" />
          Products
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Detail Product</DialogTitle>
          <div className="flex h-[50vh] overflow-auto gap-1 mt-2 justify-start items-stretch w-full flex-col">
            {products.map(
              (product: OrderQueryWithRelation["items"][number]) => (
                <div className="flex border border-primary/5 flex-col justify-start items-stretch gap-4 hover:bg-muted-foreground/5 p-3">
                  <div className="flex justify-center gap-4 items-stretch">
                    <div className="flex justify-center h-20 items-center">
                      {product.variant?.product.cover?.url ? (
                        <Image
                          src={product.variant.product.cover.url}
                          alt={product.variant.product.name}
                          width={200}
                          loading="lazy"
                          height={200}
                          className="aspect-square w-fit h-full"
                        />
                      ) : (
                        <div className="h-full aspect-square bg-muted-foreground/10 flex justify-center items-center">
                          <ImageOff className="text-muted-foreground/15" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-start items-start">
                      <Link
                        href={`/products/${product.variant?.product.slug}`}
                        className="font-semibold line-clamp-1"
                      >
                        {product.variant?.product.name}
                      </Link>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
                        ${product.variant?.product.price.toString()} (Quantity:
                        {""}
                        {product.quantity})
                      </p>
                      <div className="flex gap-1 mt-2">
                        <div className="border text-xs w-6 h-6 flex justify-center items-center">
                          {product.variant?.size.code}
                        </div>
                        <div
                          style={{
                            backgroundColor: product.variant?.colour.code,
                          }}
                          className="border w-6 h-6 flex justify-center items-center"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-end items-center">
                    <p>
                      <span className="font-semibold">
                        $
                        {(
                          product.quantity *
                          Number(product.variant?.product.price)
                        ).toFixed(2)}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetail;
