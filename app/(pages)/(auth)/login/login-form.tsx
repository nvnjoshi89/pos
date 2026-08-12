import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { Form } from "@/components/form/form";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
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
        <CardContent className="pt-4"></CardContent>
      </Card>
    </div>
  );
}
