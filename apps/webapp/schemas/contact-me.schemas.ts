import { z } from "zod";

export const createContactMeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  message: z.string(),
  wantAcknowledgement: z.boolean().default(false),
});
