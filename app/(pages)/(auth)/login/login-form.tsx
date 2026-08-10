import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div className={cn("flex w-full flex-col items-center justify-center")}>
      <Card className="w-full border-white/30 bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl dark:border-white/10 dark:bg-gray-900/50 p-2">
        <CardHeader className="flex flex-col items-center gap-4">
          hey
        </CardHeader>
      </Card>
    </div>
  );
}
