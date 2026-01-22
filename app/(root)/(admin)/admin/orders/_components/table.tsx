import React from "react";
import { ProductQueryWithRelation } from "@/helpers/type/product.type";
import {
  productTableHeader,
  ProductTableHeaderType,
} from "@/app/(root)/(admin)/admin/products/_components/table-properties";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Eye,
  Heart,
  ImageOff,
  Mail,
  MapPin,
  Mars,
  PenBox,
  Phone,
  Star,
  Trash,
  Venus,
  VenusAndMars,
} from "lucide-react";
import Image from "next/image";
import NoItem from "@/components/no-item";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { VariantQueryWithRelation } from "@/helpers/type/variant.type";
import { variantTableHeader } from "@/app/(root)/(admin)/admin/variants/_components/table-properties";
import { OrderQueryWithRelation } from "@/helpers/type/order.type";
import {
  orderTableHeader,
  OrderTableHeaderType,
} from "@/app/(root)/(admin)/admin/orders/_components/table-properties";
import moment from "moment";
import { BiUser } from "react-icons/bi";
import OrderDetail from "@/app/(root)/(admin)/admin/orders/_components/order-detail";
import UpdateOrderStatus from "@/app/(root)/(admin)/admin/orders/_components/order-status";
import { QueryObserverResult, RefetchOptions } from "@tanstack/query-core";

const OrderTable = ({
  refetch,
  orders,
}: {
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
  orders: OrderQueryWithRelation[];
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-background">
          {orderTableHeader.map(
            (header: OrderTableHeaderType, index: number) => (
              <th
                className={cn(
                  "text-sm border-b border-r border-primary/5 whitespace-nowrap text-center font-semibold p-4",
                  index === productTableHeader.length - 1 && "border-r-0",
                )}
                key={index}
              >
                {header.name}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody className="flex-1 overflow-auto">
        {orders.map((order: OrderQueryWithRelation, index: number) => (
          <tr
            key={index}
            className={cn(
              "hover:bg-primary/2 border-b border-primary/5",
              index === orders.length - 1 && "border-b-0",
            )}
          >
            <td className="p-4 text-sm leading-6">
              <span className="font-bold whitespace-nowrap">
                {order.fullName}
              </span>
              <br />
              <span className="text-muted-foreground whitespace-nowrap">
                <Mail className="inline w-3 h-3" /> {order.email}
              </span>
              <br />
              <span className="text-muted-foreground whitespace-nowrap">
                <Phone className="inline w-3 h-3" /> {order.phone}
              </span>
              <br />
              <span className="text-muted-foreground">
                <MapPin className="inline w-3 h-3" /> {order.address}
              </span>
            </td>
            <td className="p-4 text-sm text-center whitespace-nowrap">
              {moment(order.createdAt).format("MMM Do YYYY, h:mm a")}
              <br />
              <span className="text-muted-foreground">
                <BiUser className="inline w-3 h-3" /> {order.user.email}
              </span>
            </td>
            <td className="p-4 text-sm text-center">
              <Button variant="outline" size="sm" className="text-xs">
                {order.paymentMethod}
              </Button>
            </td>
            <td className="p-4 text-sm text-center leading-5">
              ${Number(order.total).toFixed(2)}
              <br />
              <span className="text-xs text-muted-foreground">
                With {order.items.length} Products
              </span>
            </td>
            <td className="p-4 text-sm text-center leading-5">
              <UpdateOrderStatus
                refetch={refetch}
                currentStatus={order.status}
                orderId={order.id}
              />
              <OrderDetail products={order.items} />
              <Button variant="outline" size="sm" className="text-xs w-full">
                <Trash className="w-3 h-3" />
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
