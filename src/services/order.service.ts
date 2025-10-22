import { Order, OrderProduct, Product, Client } from "../models/index.models.ts";
import type { OrderCreation } from "../models/orders.models.ts";
import { sequelize } from "../config/database.ts";

// GET all orders
const getOrders = async (): Promise<Order[]> => {
  return await Order.findAll({
    include: [
      { model: Client },
      { model: OrderProduct, include: [Product] },
    ],
  });
};

// GET order by ID
const getOrderById = async (id: number): Promise<(Order & { OrderProducts?: OrderProduct[] }) | null> => {
  const order = await Order.findByPk(id, {
    include: [
      { model: Client },
      { model: OrderProduct, include: [Product] },
    ],
  }) as Order & { OrderProducts?: OrderProduct[] } | null;

  return order;
};

// POST create order (con validación de stock)
const postOrder = async (
  newOrder: OrderCreation,
  products: { product_id: number; amount: number }[]
): Promise<Order> => {
  return await sequelize.transaction(async (t) => {
    const order = await Order.create(newOrder, { transaction: t });

    for (const { product_id, amount } of products) {
      const product = await Product.findByPk(product_id, { transaction: t });
      if (!product) throw new Error(`Producto ${product_id} no encontrado`);
      if (product.stock < amount) throw new Error(`Stock insuficiente para ${product.name}`);

      await product.update({ stock: product.stock - amount }, { transaction: t });
      await OrderProduct.create({ order_id: order.id, product_id, amount }, { transaction: t });
    }

    return order;
  });
};

// GET orders by client
const getOrdersByClient = async (clientId: number): Promise<Order[]> => {
  return await Order.findAll({
    where: { client_id: clientId },
    include: [{ model: OrderProduct, include: [Product] }],
  });
};

// GET orders by product
const getOrdersByProduct = async (productId: number): Promise<Order[]> => {
  return await Order.findAll({
    include: [
      { model: OrderProduct, where: { product_id: productId }, include: [Product] },
    ],
  });
};

// DELETE order (restaurando stock)
const deleteOrder = async (id: number): Promise<boolean> => {
  return await sequelize.transaction(async (t) => {
    const order = await Order.findByPk(id, {
      include: [OrderProduct],
      transaction: t,
    }) as Order & { OrderProducts?: OrderProduct[] } | null;

    if (!order) return false;

    for (const op of order.OrderProducts ?? []) {
      const product = await Product.findByPk(op.product_id, { transaction: t });
      if (product) {
        await product.update({ stock: product.stock + op.amount }, { transaction: t });
      }
    }

    await OrderProduct.destroy({ where: { order_id: id }, transaction: t });
    await Order.destroy({ where: { id }, transaction: t });
    return true;
  });
};

export { getOrders, getOrderById, postOrder, getOrdersByClient, getOrdersByProduct, deleteOrder };
