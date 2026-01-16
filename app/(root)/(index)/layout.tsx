import Cart from "@/app/(root)/_components/cart/cart";
import Sidebar from "@/app/(root)/_components/sidebar";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh flex flex-col justify-start items-center">
      <header className="border-b border-primary/5 w-full flex justify-center items-center">
        <div className="max-w-5xl w-full md:gap-8 gap-2 p-4 flex justify-between items-center">
          <Link
            href="/"
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
            primerch
          </Link>
          <nav className="md:flex ml-auto gap-6 justify-center items-center hidden">
            <Link className="text-xs uppercase" href="/">
              Home
            </Link>
            <Link className="text-xs uppercase" href="/collections">
              Collections
            </Link>
            <Link className="text-xs uppercase" href="/">
              Upcomming
            </Link>
          </nav>
          <div className="flex ml-auto gap-2 justify-center items-center">
            <Cart />
            <Button asChild size="lg">
              <Link href="/profile">
                <User2 />
              </Link>
            </Button>
          </div>
          <Sidebar />
        </div>
      </header>
      <main className="flex-1 w-full flex flex-col justify-start items-center overflow-auto">
        {children}
      </main>
    </div>
  );
}
