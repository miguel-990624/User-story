import { Router } from "express";
import authRoutes from "./auth.routes.ts";
import clientRoutes from "./client.routes.ts";
import productRoutes from "./product.routes.ts";
import storehouseRoutes from "./storehouse.routes.ts";
import stockStorehouseRoutes from "./stockStorehouse.routes.ts";
import orderRoutes from "./order.routes.ts";
import orderItemRoutes from "./orderItem.routes.ts";
/*import courseRoutes from "./course.routes.ts";
import enrollmentRoutes from "./enrollment.routes.ts";
import userRoutes from "./user.routes.ts";*/

const router = Router();

router.use("/auth", authRoutes);
router.use("/client", clientRoutes);
router.use("/products", productRoutes);
router.use("/storehouse", storehouseRoutes);
router.use("/stock", stockStorehouseRoutes);
router.use("/orders", orderRoutes);
router.use("/order-items", orderItemRoutes);
/*router.use("/courses", courseRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/users", userRoutes);*/

export default router;
