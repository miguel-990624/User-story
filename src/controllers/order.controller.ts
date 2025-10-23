import { type Request, type Response } from "express";
import {
  getOrders,
  getOrderById,
  postOrder,
  getOrdersByClient,
  getOrdersByProduct,
  deleteOrder,
} from "../services/order.service.ts";

// GET all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    return res.json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    return res.status(500).json({ error: "Internal error fetching orders" });
  }
};

// GET order by ID
const getOneOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(Number(id));
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.json(order);
  } catch (error) {
    console.error("Get Order Error:", error);
    return res.status(500).json({ error: "Internal error fetching order" });
  }
};

// POST create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { client_id, products } = req.body;

    if (!client_id || !products || !Array.isArray(products)) {
      return res.status(400).json({ error: "client_id and products are required" });
    }

    const order = await postOrder({ client_id }, products);
    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error: any) {
    console.error("Create Order Error:", error);
    return res.status(400).json({ error: error.message || "Error creating order" });
  }
};

// GET orders by client
const getOrdersClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const orders = await getOrdersByClient(Number(clientId));
    return res.json(orders);
  } catch (error) {
    console.error("Get Orders by Client Error:", error);
    return res.status(500).json({ error: "Internal error fetching client orders" });
  }
};

// GET orders by product
const getOrdersProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const orders = await getOrdersByProduct(Number(productId));
    return res.json(orders);
  } catch (error) {
    console.error("Get Orders by Product Error:", error);
    return res.status(500).json({ error: "Internal error fetching product orders" });
  }
};

// DELETE order
const removeOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteOrder(Number(id));
    if (!deleted) return res.status(404).json({ error: "Order not found" });
    return res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete Order Error:", error);
    return res.status(500).json({ error: "Internal error deleting order" });
  }
};

export {
  getAllOrders,
  getOneOrder,
  createOrder,
  getOrdersClient,
  getOrdersProduct,
  removeOrder,
};
