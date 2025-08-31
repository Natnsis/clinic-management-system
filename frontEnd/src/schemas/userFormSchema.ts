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

export const registerFormSchema = z
  .object({
    fName: z.string().min(2, "First name is required"),
    lName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email"),
    studentId: z.string().min(3, "Student ID is required"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const addStaffFromSchema = z.object({
  fName: z
    .string()
    .nonempty("please enter first name")
    .min(3, "first name must be at least 3 characters"),
  lName: z
    .string()
    .nonempty("please enter last name")
    .min(3, "last name must be at least 3 characters"),
  email: z.string().email("please enter a valid email"),
  phoneNumber: z
    .string()
    .min(10, "phone number is at least 10 character")
    .max(13, "phone number cant be more than 13 character"),
  role: z.string().nonempty("select a role"),
  department: z.string().nonempty("select a department"),
  availability: z.string().nonempty("select availability"),
  password: z
    .string()
    .min(4, "password must have at least 4 characters")
    .nonempty(),
});
