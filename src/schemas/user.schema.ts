import { z } from "zod";

const baseUser = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Correo inválido"),
  role: z.enum(["admin", "analyst"]).default("analyst"),
});

export const UserRegisterSchema = baseUser.extend({
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const UserUpdateSchema = baseUser.partial();