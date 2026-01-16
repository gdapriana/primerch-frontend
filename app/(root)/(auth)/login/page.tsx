"use client";
import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";
import { FormEvent, useEffect, useState } from "react";
import { UserLoginRequest } from "@/helpers/type/user.type";
import { useAuth } from "@/helpers/context/auth/auth.hook";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

export default function LoginPage() {
  const { login } = useAuth();

  const [loginForm, setLoginForm] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });
  const onFormSubmited = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(loginForm);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              onFormSubmited={onFormSubmited}
              loginForm={{ value: loginForm, setValue: setLoginForm }}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1603189343302-e603f7add05a?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
