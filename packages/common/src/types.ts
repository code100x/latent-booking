
import { z } from "zod";

export const CreateEventSchema = z.object({
    name: z.string(),
    description: z.string(),
    startTime: z.string(),
    locationId: z.string(),
    banner: z.string(),
    seats: z.array(z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        capacity: z.number(),
    }))
})

export const CreateLocationSchema = z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
})

export const UpdateEventSchema = z.object({
    name: z.string(),
    description: z.string(),
    startTime: z.string(),
    location: z.string(),
    banner: z.string(),
    published: z.boolean(),
    ended: z.boolean(),
})

export const UpdateSeatSchema = z.object({
    seats: z.array(z.object({
        id: z.string().optional(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        capacity: z.number(),
    }))
})

export const CreateBookingSchema = z.object({
    eventId: z.string(),
    seats: z.array(z.object({
        id: z.string(),
        qty: z.number()
    })),
});

export const RazorpayWebhookSchema = z.object({
    event: z.string(),
    id: z.string(),
    amount: z.number(),
    currency: z.string(),
    notes: z.object({
        bookingId: z.string(),
    }),
    webhookSecret: z.string()
})