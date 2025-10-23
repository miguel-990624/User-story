// src/models/index.models.ts
import { sequelize } from "../config/database.ts";
import { User } from "./users.models.ts";
import { Client } from "./clients.models.ts";
import { Product } from "./products.models.ts";
import { Order } from "./orders.models.ts";
import { OrderProduct } from "./orderProducts.models.ts";

// =====================
// Definición de relaciones
// =====================

// Un cliente tiene muchos pedidos
Client.hasMany(Order, { foreignKey: "client_id" });
Order.belongsTo(Client, { foreignKey: "client_id" });

// Un pedido tiene muchos OrderProduct
Order.hasMany(OrderProduct, { foreignKey: "order_id" });
OrderProduct.belongsTo(Order, { foreignKey: "order_id" });

// Un producto tiene muchos OrderProduct
Product.hasMany(OrderProduct, { foreignKey: "product_id" });
OrderProduct.belongsTo(Product, { foreignKey: "product_id" });

// =====================
// Exporta todo junto
// =====================
export { sequelize, User, Client, Product, Order, OrderProduct };
