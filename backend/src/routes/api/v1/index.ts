import { Hono } from "hono";
import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";

const router = new Hono();

// Routes
router.route("/auth", AuthRoutes);
router.route("/users", UserRoutes);

// Endpoints
router.get("/", (c) => c.text("Hi from v1"));

export default router;
