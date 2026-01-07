import { Hono } from "hono";
import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";
import LinkRoutes from "./link.routes";

const router = new Hono();

// Routes
router.route("/auth", AuthRoutes);
router.route("/users", UserRoutes);
router.route("/links", LinkRoutes);

// Endpoints
router.get("/", (c) => c.text("Hi from v1"));

export default router;
