import { Hono } from "hono";

const router = new Hono();

// Endpoints
router.get("/", (c) => c.text("Hi from v1"));

export default router;
