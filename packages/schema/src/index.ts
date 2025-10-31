import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const SignUpSchema = z.object({
    name: requiredString,
    email: requiredString,
    password: z.string().min(6, { message: "invalid password" }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
    email: requiredString,
    password: requiredString,
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;