"use client";
import Loading from "@/components/loading";
import { useAuth } from "@/helpers/context/auth/auth.hook";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, loading, router]);

  if (loading) return <Loading />;
  if (!loading && !isAuthenticated) return;
  return <main className="max-w-5xl w-full">{children}</main>;
}
