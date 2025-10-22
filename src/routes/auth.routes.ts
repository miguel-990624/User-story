import { Router } from "express";
import { register, login } from "../controllers/auth.controller.ts";
import { validate } from "../middlewares/validate.middleware.ts";
import { UserRegisterSchema, UserLoginSchema } from "../schemas/user.schema.ts";

const router = Router();

// Registro y login con validación Zod
router.post("/register", validate(UserRegisterSchema), register);
router.post("/login", validate(UserLoginSchema), login);

export default router;