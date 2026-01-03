import { Hono } from "hono";
import { UserController } from "@/controllers/user.controller";
import {
  validateBody,
  validateParams,
} from "@/middlewares/validator.middleware";
import {
  createUserSchema,
  emailValidation,
  idValidation,
  updateUserSchema,
  usernameValidation,
} from "@mylinkspace/shared";

const router = new Hono();

// Endpoints

// Create user
router.post(
  "/",
  validateBody(createUserSchema), // Validate create user body
  UserController.createUser
);

// Get user by ID
router.get(
  "/:id{[0-9]+}",
  validateParams(idValidation), // Validate ID param
  UserController.getUserById
);

// Get user by username
router.get(
  "/:username",
  validateParams(usernameValidation), // Validate username param
  UserController.getUserByUsername
);

// Check if email exists
router.post(
  "/isEmailExist",
  validateBody(emailValidation), // Validate email body
  UserController.checkEmailExistance
);

// Update user by ID
router.put(
  "/:id{[0-9]+}",
  validateParams(idValidation), // Validate ID param
  validateBody(updateUserSchema), // Validate update user body
  UserController.updateUser
);

// Delete user by ID
router.delete(
  "/:id{[0-9]+}",
  validateParams(idValidation), // Validate ID param
  UserController.deleteUser
);

export default router;
