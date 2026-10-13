"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/assets/logo.png";

import { useLoginMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/validators/auth";
import { useStorage } from "@/hooks/use-storage";
import { STORAGE_KEYS } from "@/constants/storage.constants";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const { setItem } = useStorage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<LoginFormData> = async (
    data: LoginFormData,
  ) => {
    try {
      const response = await login(data).unwrap();
      setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      setItem(
        STORAGE_KEYS.USER,
        JSON.stringify({
          ...response,
        }),
      );
      router.push("/user/user-management");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-6",
        className,
      )}
      {...props}
    >
      <Card className="w-full border border-white/30 ring-0  bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl dark:border-white/10 dark:bg-gray-900/50 p-2">
        <CardHeader className="flex flex-col items-center gap-4 text-center pb-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-400/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300 pointer-events-none" />
            <Image
              src={Logo.src}
              width={80}
              height={80}
              alt="Logo"
              className="relative rounded-2xl border border-white/40 shadow-md group-hover:scale-105 transition-all duration-300 dark:border-white/10"
            />
          </div>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Pos Admin
            </CardTitle>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Sign in to manage your institution
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email Adress</FieldLabel>
                <Input
                  id="email"
                  placeholder="admin@pos.com"
                  className="bg-white/50 dark:bg-gray-950/30"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                <FieldError
                  errors={errors.email ? [errors.email] : undefined}
                />
              </Field>

              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/50 dark:bg-gray-950/30"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                <FieldError
                  errors={errors.password ? [errors.password] : undefined}
                />
              </Field>
              <Button
                type="submit"
                className="w-full h-10 mt-2 font-medium tracking-wide active:scale-[0.98] transition-all duration-150"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
