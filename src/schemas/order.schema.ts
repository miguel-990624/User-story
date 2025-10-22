import { z } from "zod";

const orderProduct = z.object({
  product_id: z.number()
    .int("El ID del producto debe ser un número entero")
    .positive("El ID del producto debe ser mayor a 0"),
  amount: z.number()
    .int("La cantidad debe ser un número entero")
    .min(1, "La cantidad debe ser al menos 1"),
});

export const OrderCreateSchema = z.object({
  client_id: z.number()
    .int("El ID del cliente debe ser un número entero")
    .positive("El ID del cliente debe ser mayor a 0"),
  products: z.array(orderProduct)
    .min(1, "Debe incluir al menos un producto en la orden"),
});

export const OrderUpdateSchema = z.object({
  products: z.array(orderProduct).optional(),
});
