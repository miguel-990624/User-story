import { Order } from "../models/orders.models.ts";
import { OrderProduct } from "../models/orderProducts.models.ts";
import { Client } from "../models/clients.models.ts";
import { Product } from "../models/products.models.ts";

export async function seedOrders() {
  // Busca un cliente y algunos productos ya existentes
  const client = await Client.findOne();
  const products = await Product.findAll({ limit: 2 });

  if (!client || products.length < 2) {
    throw new Error("Necesitas al menos 1 cliente y 2 productos para poblar órdenes");
  }

  // Crea una orden para ese cliente
  const order = await Order.create({
    client_id: client.id,
  });

  // Asocia productos a la orden
  await OrderProduct.bulkCreate([
    {
      order_id: order.id,
      product_id: products[0]!.id,
      amount: 2,
    },
    {
      order_id: order.id,
      product_id: products[1]!.id,
      amount: 1,
    },
  ]);

  console.log("✅ Orden y productos asociados insertados correctamente");
}
