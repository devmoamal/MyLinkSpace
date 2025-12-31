import { Hono } from "hono";

const router = new Hono();

// Endpoints
router.get("/", (c) => c.text("Hi from v2"));

export default router;
