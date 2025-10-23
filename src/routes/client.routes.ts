import { Router } from "express";
import { getClientsController, getClientByIdController, postClientController, putClientController, deleteClientController } from "../controllers/client.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";
import { authorize } from "../middlewares/authorize.middleware.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { ClientCreateSchema, ClientUpdateSchema} from "../schemas/client.schema.ts";

const router = Router();

// Público
router.get("/", authenticate, authorize(["admin","analyst"]), getClientsController);
router.get("/:id", authenticate, authorize(["admin", "analyst"]), getClientByIdController);
// Solo admin
router.post("/", authenticate, authorize(["admin"]), validate(ClientCreateSchema), postClientController);
router.put("/:id", authenticate, authorize(["admin"]), validate(ClientUpdateSchema), putClientController);
router.delete("/:id", authenticate, authorize(["admin"]), deleteClientController);

export default router;