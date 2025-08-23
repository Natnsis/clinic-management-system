import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email provided")
    .nonempty("email is not provided"),
  password: z
    .string()
    .min(3, "password must be minimum 3 characters")
    .nonempty("password is not provided"),
});
