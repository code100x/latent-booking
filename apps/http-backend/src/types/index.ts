import { z } from 'zod'

declare global {
    namespace Express {
        export interface Request {
            userId?: string;
            role?: string;
        }
    }
}

export const SignUpSchema = z.object({
    phoneNumber: z.string().min(11).max(11),
    name: z.string()
})

export const VerifySignUpSchema = z.object({
    phoneNumber: z.string().min(11).max(11),
    name: z.string(),
    otp: z.string().length(6)
})

export const CreateEventSchema = z.object({
    name: z.string(),
    description: z.string(),
    banner: z.string()
})

export const DeleteEventSchema = z.object({
    id: z.string()
})

export const UpdateEventSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    banner: z.string()
})