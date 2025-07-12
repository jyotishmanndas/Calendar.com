import { videoCall } from "@/generated/prisma";
import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    username: z.string().min(4).regex(/^[a-zA-Z0-9-]+$/, { message: "Username can only contain letters, numbers and -" }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});

export const signInschema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(20, { message: "Password must be at most 20 characters long" })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});

export const profileSetupSchema = z.object({
    username: z.string().min(4).regex(/^[a-zA-Z0-9-]+$/, { message: "Username can only contain letters, numbers and -" }),
    name: z.string().min(2, { message: "Name must be at leat 2 characters" })
});

export const eventSchema = z.object({
    title: z.string().min(2),
    url: z.string().url(),
    description: z.string(),
    duration: z.number().int().positive(),
    videoCallProvider: z.nativeEnum(videoCall)
});

export const profileUpdateSchema = z.object({
    username: z.string().min(4).regex(/^[a-zA-Z0-9-]+$/, { message: "Username can only contain letters, numbers and -" }),
    name: z.string().min(2, { message: "Name must be at leat 2 characters" }),
    email: z.string().email({ message: "Email is required" }),
    about: z.string().min(2).max(32).optional()
});

export const availabilitySchema = z.object({
    name: z.string().min(2)
});