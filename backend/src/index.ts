import Router from "@/routes";
import LoggerMiddleware from "@/middlewares/logger";
import { server } from "@/server";

// Hono app that start with Bun
const app = server();

// Middlewares
app.use(LoggerMiddleware());

// Router
app.route("/", Router);
