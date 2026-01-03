import { Hono } from "hono";
import UsersRouter from "./users.route";

const router = new Hono();

// Routes
router.route("/users", UsersRouter);

// Endpoints
router.get("/", (c) => c.text("Hi from v1"));

export default router;
