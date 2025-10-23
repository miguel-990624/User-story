import { Product } from "../models/products.models.ts";

export async function seedProducts() {
  await Product.bulkCreate([
    {
      name: "Balón de Fútbol",
      price: 29.99,
      stock: 50,
    },
    {
      name: "Raqueta de Tenis",
      price: 89.99,
      stock: 20,
    },
    {
      name: "Guantes de Boxeo",
      price: 45.5,
      stock: 15,
    },
  ]);
}
