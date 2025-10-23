import { Router } from "express";
import {
  getAllOrders,
  getOneOrder,
  createOrder,
  getOrdersClient,
  getOrdersProduct,
  removeOrder,
} from "../controllers/order.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { authorize } from "../middlewares/authorize.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { OrderCreateSchema } from "../schemas/order.schema.ts";

const router = Router();

// Consultar órdenes (admin y analyst)
router.get("/", authenticate, authorize(["admin", "analyst"]), getAllOrders);
router.get("/:id", authenticate, authorize(["admin", "analyst"]), getOneOrder);

// Consultar órdenes filtradas
router.get("/client/:clientId", authenticate, authorize(["admin", "analyst"]), getOrdersClient);
router.get("/product/:productId", authenticate, authorize(["admin", "analyst"]), getOrdersProduct);

// Crear orden (solo admin)
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validate(OrderCreateSchema),
  createOrder
);

// Eliminar orden (solo admin)
router.delete("/:id", authenticate, authorize(["admin"]), removeOrder);

export default router;
