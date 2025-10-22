import { z } from "zod";

// CREATE schema
const ClientCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Client name is required")
    .max(255, "Client name must be at most 255 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .max(255, "Email must be at most 255 characters"),
  phone: z
    .string()
    .max(20, "Phone must be at most 20 characters")
    .optional(),
});

// UPDATE schema (todo opcional)
const ClientUpdateSchema = z.object({
  name: z.string().max(255, "Client name must be at most 255 characters").optional(),
  email: z.string().email("Invalid email format").max(255, "Email must be at most 255 characters").optional(),
  phone: z.string().max(20, "Phone must be at most 20 characters").optional(),
});

export { ClientCreateSchema, ClientUpdateSchema };