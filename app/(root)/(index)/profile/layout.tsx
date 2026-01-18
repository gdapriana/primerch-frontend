"use client";
import ProfileSheet from "@/app/(root)/(index)/profile/_components/profile-sheet";
import Loading from "@/components/loading";
import { useAuth } from "@/helpers/context/auth/auth.hook";
import { profileMenu, ProfileMenuType } from "@/helpers/type/random.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LogoutAlert from "@/app/(root)/(index)/profile/_components/logout-alert";

export default function Layout({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, loading, router]);

  if (loading) return <Loading />;
  if (!loading && !isAuthenticated) return;
  return (
    <main className="max-w-5xl w-full h-full">
      <main className="w-full flex justify-center items-center h-full px-4 py-4 md:py-0">
        <div className="w-full h-full relative max-w-5xl flex flex-col justify-start items-stretch md:flex-row md:justify-center md:items-stretch">
          <ProfileSheet />
          <div className="w-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:w-9/12 md:py-4 md:overflow-auto">
            {children}
          </div>
          <div className="hidden md:flex flex-col justify-start items-stretch md:w-3/12 border-l border-primary/5">
            {profileMenu.map((menu: ProfileMenuType, index: number) => (
              <Link
                className="text-sm p-4 border-b border-primary/5 hover:bg-primary/2"
                key={index}
                href={menu.url}
              >
                {menu.name}
              </Link>
            ))}
            <LogoutAlert />
          </div>
        </div>
      </main>
    </main>
  );
}
