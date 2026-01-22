"use client";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { adminMenu, AdminMenuType } from "@/helpers/type/random.type";
import { cn } from "@/lib/utils";
import CustomBreadcum from "@/components/breadcum";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import AdminSheet from "@/app/(root)/(admin)/admin/_components/admin-sheet";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const category = pathname.split("/").filter(Boolean).pop();

  return (
    <div className="h-screen flex flex-col justify-start items-center">
      <main className="flex-1 w-full flex flex-col justify-start h-full items-center overflow-auto">
        <div className="max-w-5xl w-full py-0 flex h-full justify-center items-stretch">
          <aside className="hidden border-r min-w-[200px] border-primary/5 md:flex flex-col justify-start items-stretch">
            <header className="border-b border-primary/5 p-4 py-12">
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
            </header>
            <nav className="w-full flex-1 flex flex-col justify-start items-stretch">
              {adminMenu.map((menu: AdminMenuType, index: number) => (
                <a
                  className={cn(
                    "border-primary/5 p-4 hover:bg-primary/5 font-semibold uppercase text-sm",
                    adminMenu.length !== index + 1 && "border-b",
                    menu.name.toLowerCase() === category?.toLowerCase() &&
                      "bg-primary text-background hover:bg-primary hover:text-background",
                  )}
                  key={index}
                  href={menu.url}
                >
                  {menu.name}
                </a>
              ))}

              <Button className="mt-auto" asChild>
                <Link href={"/products"}>Client</Link>
              </Button>
            </nav>
          </aside>
          <div className="w-full md:w-auto md:flex-1 flex flex-col justify-start items-stretch">
            <div className="p-4 border-b border-primary/5 flex justify-start items-center gap-4">
              <AdminSheet />
              {/*<CustomBreadcum*/}
              {/*  data={[*/}
              {/*    { name: "Admin", url: "/admin" },*/}
              {/*    { name: category || "", url: "/admin/products" },*/}
              {/*  ]}*/}
              {/*/>*/}
            </div>
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
