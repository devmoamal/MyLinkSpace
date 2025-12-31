import { Hono } from "hono";
import ApiRouter from "@/routes/api";

const router = new Hono();

// Endpoints
router.get("/", (c) => c.text("Hellon! Hono on Bun"));

// Routes
router.route("/api", ApiRouter);

export default router;
