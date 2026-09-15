import { email, string, z } from "zod";

export const loginFormSchema = z.object({
  email: z.email().min(3),
  password: z.string().min(8),
});
