"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { profileMenu, ProfileMenuType } from "@/helpers/type/random.type";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfileSheet() {
  const [onSheetOpen, setSheetOpen] = useState<boolean>(false);
  return (
    <Sheet open={onSheetOpen} onOpenChange={(e) => setSheetOpen(e)}>
      <SheetTrigger className="md:hidden absolute top-0 right-0" asChild>
        <Button size="icon-sm" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetHeader>
        <div className="flex px-4 gap-4 flex-col justify-start items-stretch">
          {profileMenu.map((menu: ProfileMenuType, index: number) => (
            <Link
              className="text-sm"
              onClick={() => setSheetOpen(false)}
              key={index}
              href={menu.url}
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
