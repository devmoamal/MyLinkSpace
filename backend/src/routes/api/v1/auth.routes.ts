import { AuthController } from "@/controllers/auth.controller";
import { validateBody } from "@/middlewares/validator.middleware";
import { loginSchema, registerSchema } from "@mylinkspace/shared";
import { Hono } from "hono";

const router = new Hono();

// Routes

// Login user
router.post(
  "/login",
  validateBody(loginSchema), // Validate body
  AuthController.login // Login controller
);

// Register user
router.post(
  "/register",
  validateBody(registerSchema), // Validate body
  AuthController.register // Register user controller
);

export default router;
