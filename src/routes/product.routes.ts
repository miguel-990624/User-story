import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { authorize } from "../middlewares/authorize.middleware.ts";
import { getProductsController, getProductByIdController, postProductController, putProductController, deleteProductController } from "../controllers/product.controller.ts";

const router = Router();

router.get( "/", authenticate, authorize(["admin", "analyst"]), getProductsController );
router.get( "/:id", authenticate, authorize(["admin", "analyst"]), getProductByIdController );

router.post( "/", authenticate, authorize(["admin"]), postProductController );
router.put( "/:id", authenticate, authorize(["admin"]), putProductController );
router.delete( "/:id", authenticate, authorize(["admin"]), deleteProductController );

export default router 