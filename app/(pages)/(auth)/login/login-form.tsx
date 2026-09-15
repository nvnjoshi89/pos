"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { Form } from "@/components/form/form";
import { FormField } from "@/components/form/form-field";
import { useLoginMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/validators/auth";
import { useStorage } from "@/hooks/use-storage";
import { STORAGE_KEYS } from "@/constants/storage.constants";

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
  const form = useForm<LoginFormData>({
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
    >
      <Card className="w-full border-white/30 bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl dark:border-white/10 dark:bg-gray-900/50 p-2">
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
          <div>
            <CardTitle
              title="SIP"
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            />
            <p className="text-xs font-medium">
              Sign in to manage your institution
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Form form={form} onSubmit={onSubmit}>
            <div>
              <FormField name="email" label="" />
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
