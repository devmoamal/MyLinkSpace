import { Hono } from "hono";

import V1Router from "@/routes/api/v1";
import V2Router from "@/routes/api/v2";

const router = new Hono();

// Endpoints
router.get("/", (c) => c.text("Hi from /api"));

// Routes
router.route("/v1", V1Router);
router.route("/v2", V2Router);

export default router;
