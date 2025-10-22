import { Router } from "express";
import authRoutes from "./auth.routes.ts";
import clientRoutes from "./client.routes.ts";
import productRoutes from "./product.routes.ts";


const router = Router();

router.use("/auth", authRoutes);
router.use("/client", clientRoutes);
router.use("/products", productRoutes);

export default router;
