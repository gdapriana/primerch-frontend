import { Prisma } from "@/helpers/generated/prisma/client";

export type PaymentMethodType = { name: string; code: string; icon?: string };
export type OrderSortBy =
  | "createdAt"
  | "updatedAt"
  | "fullName"
  | "email"
  | "total";

export const orderSortBy: { name: string; value: OrderSortBy }[] = [
  { name: "Created At", value: "createdAt" },
  { name: "Updated At", value: "updatedAt" },
  { name: "Full Name", value: "fullName" },
  { name: "Email", value: "email" },
  { name: "Total", value: "total" },
];

export const paymentMethods: PaymentMethodType[] = [
  {
    code: "CASH_ON_DELIVERY",
    name: "Cash on Delivery",
  },
  {
    code: "BANK_TRANSFER",
    name: "Bank Transfer",
  },
  {
    code: "VIRTUAL_ACCOUNT",
    name: "Virtual Account",
  },
  {
    code: "QRIS",
    name: "QRIS",
  },
  {
    code: "E_WALLET_DANA",
    name: "Dana",
  },
  {
    code: "E_WALLET_OVO",
    name: "OVO",
  },
  {
    code: "E_WALLET_GOPAY",
    name: "GoPay",
  },
  {
    code: "E_WALLET_SHOPEEPAY",
    name: "ShopeePay",
  },
  {
    code: "CREDIT_CARD",
    name: "Credit Card",
  },
  {
    code: "DEBIT_CARD",
    name: "Debit Card",
  },
];

export type CreateOrderRequest = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: PaymentMethodType["code"];
};

export type OrderQueryWithRelation = Prisma.OrderGetPayload<{
  include: {
    items: {
      select: {
        quantity: true;
        variant: {
          select: {
            product: {
              select: {
                cover: {
                  select: {
                    url: true;
                  };
                };
                name: true;
                price: true;
                slug: true;
              };
            };
            size: { select: { name: true; code: true } };
            colour: { select: { name: true; code: true } };
          };
        };
      };
    };
    user: {
      select: {
        email: true;
        id: true;
      };
    };
  };
}>;

export type OrderWithRelation = Prisma.OrderGetPayload<{
  include: {
    _count: {
      select: {
        items: true;
      };
    };
    items: {
      select: {
        quantity: true;
        variant: true;
      };
    };
    user: {
      select: {
        email: true;
        id: true;
      };
    };
  };
}>;

export type OrderDetailsWithRelation = Prisma.OrderGetPayload<{
  select: {
    _count: {
      select: {
        items: true;
      };
    };
    userId: true;
    address: true;
    createdAt: true;
    email: true;
    fullName: true;
    id: true;
    items: {
      select: {
        id: true;
        quantity: true;
        variant: {
          select: {
            colour: {
              select: {
                code: true;
                name: true;
              };
            };
            size: {
              select: {
                code: true;
                name: true;
              };
            };
            stock: true;
            product: {
              select: {
                name: true;
                cover: {
                  select: {
                    url: true;
                  };
                };
                category: {
                  select: {
                    name: true;
                    slug: true;
                    id: true;
                  };
                };
                description: true;
                slug: true;
                id: true;
                price: true;
              };
            };
          };
        };
      };
    };
    paymentMethod: true;
    phone: true;
    shippingFee: true;
    status: true;
    subtotal: true;
    total: true;
  };
}>;
