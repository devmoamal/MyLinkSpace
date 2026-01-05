import Router from "@/routes";
import LoggerMiddleware from "@/middlewares/logger.middleware";
import { server } from "@/server";
import { errorHandler } from "@/middlewares/errorHandler.middleware";
import { corsMiddleware } from "./middlewares/cors.middleware";

// Hono app that start with Bun
const app = server();

// Middlewares
app.onError(errorHandler);
app.use(corsMiddleware);
app.use(LoggerMiddleware());

// Router
app.route("/", Router);
