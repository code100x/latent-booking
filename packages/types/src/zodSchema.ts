import * as z from "zod";

export const signInSchema = z.object({
  number: z.string(),
  name: z.string().optional(),
});
