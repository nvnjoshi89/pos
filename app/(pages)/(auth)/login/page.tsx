import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="from-brand-25 to-brand-50 dark:to-brand-950/30 relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-tr via-white  px-6 py-12  dark:from-gray-950 dark:via-gray-900">
      <div className="bg-brand-200/30 dark:bg-brand-500/10 pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[120px]" />
      <div className="bg-brand-300/20 dark:bg-brand-600/10 pointer-events-none absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
