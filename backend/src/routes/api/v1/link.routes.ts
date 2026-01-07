import { LinkController } from "@/controllers/link.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  validateBody,
  validateParams,
} from "@/middlewares/validator.middleware";
import {
  createLinkSchema,
  idValidation,
  linkIdValidation,
  updateLinkSchema,
} from "@mylinkspace/shared";
import { Hono } from "hono";

const router = new Hono();

// --- Endpoints --- //

// Create Link
router.post(
  "/",
  authMiddleware, // Auth middleware
  validateBody(createLinkSchema), // Validate body
  LinkController.createLink // Controller
);

// Get Link By ID
router.get(
  "/:id",
  authMiddleware, // Auth middleware
  validateParams(linkIdValidation), // Validate params
  LinkController.getLinkById // Controller
);

// Get Links By User ID
router.get(
  "/",
  authMiddleware, // Auth middleware
  LinkController.getLinksByUserId // Controller
);

// Update Link
router.put(
  "/:id",
  authMiddleware, // Auth middleware
  validateParams(linkIdValidation), // Validate params
  validateBody(updateLinkSchema), // Validate params
  LinkController.updateLink // Controller
);

// Delete Link
router.delete(
  "/:id",
  authMiddleware, // Auth middleware
  validateParams(linkIdValidation), // Validate params
  LinkController.deleteLink // Controller
);

export default router;
