"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Order } from "@/helpers/generated/prisma/client";
import { OrderRequest } from "@/helpers/request/order.request";
import {
  CreateOrderRequest,
  paymentMethods,
  PaymentMethodType,
} from "@/helpers/type/order.type";
import { Response } from "@/helpers/type/response.type";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function OrderForm({
  orderInformation,
}: {
  orderInformation: {
    value?: Order;
  };
}) {
  const [paymentMethodCode, setPaymentMethodCode] = useState<
    PaymentMethodType["code"]
  >(paymentMethods[0].code);
  const [createOrderLoading, setCreateOrderLoading] = useState<boolean>(false);
  const router = useRouter();

  const [orderForm, setOrderForm] = useState<CreateOrderRequest>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: paymentMethodCode,
  });

  const onCreateOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(
      (async () => {
        const response: Response = await OrderRequest.CREATE_ORDER(orderForm, {
          loadingValue: createOrderLoading,
          setLoadingValue: setCreateOrderLoading,
        });
        if (!response.success) throw new Error(response.message);
        return response;
      })(),
      {
        success: () => {
          router.push("/");
          return "Order created successfully";
        },
        loading: "Please wait...",
        error: (e) => {
          return e.message;
        },
      },
    );
  };

  return (
    <form
      onSubmit={onCreateOrder}
      className="p-4 w-full relative border border-primary/5 md:max-w-sm flex justify-start flex-col items-stretch gap-4"
    >
      {!orderInformation.value && (
        <div className="absolute left-0 top-0 bg-background/50 w-full h-full"></div>
      )}
      <Label className="flex flex-col justify-start items-start">
        <span className="text-xs text-muted-foreground">Full Name</span>
        <Input
          onChange={(e) =>
            setOrderForm({ ...orderForm, fullName: e.target.value })
          }
          required
          className="placeholder:text-xs text-xs h-7 placeholder:text-muted-foreground/50 p-1"
          placeholder="John Doe"
        />
      </Label>
      <Label className="flex flex-col justify-start items-start">
        <span className="text-xs text-muted-foreground">Email</span>
        <Input
          onChange={(e) =>
            setOrderForm({ ...orderForm, email: e.target.value })
          }
          required
          type="email"
          className="placeholder:text-xs text-xs h-7 placeholder:text-muted-foreground/50 p-1"
          placeholder="john@example.com"
        />
      </Label>
      <Label className="flex flex-col justify-start items-start">
        <span className="text-xs text-muted-foreground">
          Phone Number (Whatsapp)
        </span>
        <Input
          required
          onChange={(e) =>
            setOrderForm({ ...orderForm, phone: e.target.value })
          }
          type="tel"
          className="placeholder:text-xs text-xs h-7 placeholder:text-muted-foreground/50 p-1"
          placeholder="62813..."
        />
      </Label>
      <Label className="flex flex-col justify-start items-start">
        <span className="text-xs text-muted-foreground">Address</span>
        <Textarea
          onChange={(e) =>
            setOrderForm({ ...orderForm, address: e.target.value })
          }
          required
          className="placeholder:text-xs h-7 placeholder:text-muted-foreground/50 p-1"
          placeholder="Pantai Lebih st."
        />
      </Label>
      <Label className="flex flex-col justify-start items-start flex-wrap">
        <span className="text-xs flex-1 text-muted-foreground">
          Select Payment Method
        </span>
        <Select
          defaultValue={paymentMethodCode}
          onValueChange={(e: string) => {
            setPaymentMethodCode(e);
            setOrderForm({ ...orderForm, paymentMethod: e });
          }}
        >
          <SelectTrigger className="w-full text-xs">
            <SelectValue
              className="text-xs"
              placeholder="Select payment method"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Payment Methods</SelectLabel>
              {paymentMethods.map(
                (method: PaymentMethodType, index: number) => (
                  <SelectItem
                    key={index}
                    value={method.code}
                    className="text-xs"
                  >
                    {method.name}
                  </SelectItem>
                ),
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Label>

      <Button type="submit">Order Now</Button>
    </form>
  );
}
