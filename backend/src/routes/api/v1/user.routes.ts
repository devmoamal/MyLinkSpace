import { Hono } from "hono";
import { UserController } from "@/controllers/user.controller";
import {
  validateBody,
  validateParams,
} from "@/middlewares/validator.middleware";
import {
  emailValidation,
  idValidation,
  updateUserSchema,
  usernameProfileValidation,
} from "@mylinkspace/shared";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = new Hono();

// --- Endpoints --- //

// Not Auth Protected Endpoints //

// Get user profile
router.get(
  "/:username{@[a-zA-Z0-9_.]+}",
  validateParams(usernameProfileValidation), // Validate username param
  UserController.getUserByUsername // Get user by username controller
);

// Get user by ID
router.get(
  "/:id{[0-9]+}",
  validateParams(idValidation), // Validate ID param
  UserController.getUserById // Get user by ID controller
);

// Check if email exists
router.post(
  "/isEmailExist",
  validateBody(emailValidation), // Validate email body
  UserController.checkEmailExistance // Check email existance controller
);

// Auth Protected Endpoints //

// Get current user
router.get(
  "/me",
  authMiddleware,
  UserController.getCurrentUser // Get user by ID controller
);

// Update current user
router.put(
  "/me",
  authMiddleware, // Auth middleware
  validateBody(updateUserSchema), // Validate update user body
  UserController.updateCurrentUser // Update user controller
);

// Delete current user
router.delete(
  "/me",
  authMiddleware, // Auth middleware
  UserController.deleteCurrentUser // Delete user controller
);

export default router;
