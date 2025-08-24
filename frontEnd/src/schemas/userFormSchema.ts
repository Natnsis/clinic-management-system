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
    firstName: z
      .string()
      .min(3, "first name must be at least 3 characters")
      .nonempty("please insert first name"),
    lastName: z
      .string()
      .min(3, "last name should be at least 3 characters")
      .nonempty("please insert last name"),
    email: z
      .string()
      .email("please insert a valid email address")
      .nonempty("please insert email"),
    studentId: z
      .string()
      .nonempty("please insert your student id")
      .min(5, "student id must be at least 5 characters"),
    dateOfBirth: z.string().nonempty("please select your date of birth"),
    phoneNumber: z
      .number()
      .min(10, "phone number is at least 10 character")
      .max(13, "phone number cant be more than 13 character"),
    address: z.string().nonempty("please insert your address"),
    major: z.string().nonempty("choose a major"),
    academicYear: z.string().nonempty("select your academic year"),
    password: z
      .string()
      .min(4, "password must have at least 4 characters")
      .nonempty(),
    confirmPassword: z.string().nonempty("insert the confirmation password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and services.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export const addStaffFromSchema = z.object({
  firstName: z
    .string()
    .nonempty("please enter first name")
    .min(3, "first name must be at least 3 characters"),
  lastName: z
    .string()
    .nonempty("please enter last name")
    .min(3, "last name must be at least 3 characters"),
  email: z.string().email("please enter a valid email"),
  phoneNumber: z
    .number()
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
