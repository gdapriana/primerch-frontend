"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify, Hamburger } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { adminMenu, AdminMenuType } from "@/helpers/type/random.type";
import { cn } from "@/lib/utils";
import { useState } from "react";

const AdminSheet = () => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={() => setSheetOpen(!sheetOpen)}>
      <SheetTrigger asChild>
        <Button className="md:hidden">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <Link
            href="/admin"
            className="flex justify-center items-center gap-2 font-black uppercase text-lg"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/732/732112.png"
              width={100}
              height={100}
              alt="brand"
              loading="lazy"
              className="w-8 h-8 dark:filter dark:filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(100%)_saturate(0%)_hue-rotate(80deg)_brightness(106%)_contrast(106%)]"
            />
            admin
          </Link>
        </SheetHeader>
        <div className="flex flex-col justify-start p-4 items-stretch">
          {adminMenu.map((menu: AdminMenuType, index: number) => (
            <Link
              onClick={() => setSheetOpen(false)}
              href={menu.url}
              key={index}
              className={cn(
                "py-4 border-b border-primary/5",
                index === adminMenu.length - 1 && "border-none",
              )}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminSheet;
