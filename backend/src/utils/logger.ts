import { env } from "@/config/env.config";
import { appendFileSync } from "node:fs";
import { join } from "node:path";

const LOG_DIR = join(process.cwd(), "logs");

const levels = { debug: 0, info: 1, warn: 2, error: 3 };
const currentLevel =
  levels[env.LOG_LEVEL as keyof typeof levels] ?? levels.info;

const writeLog = (level: string, ...args: any[]) => {
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  const time = now.toLocaleTimeString("en-GB");
  const message = args
    .map((a) => (typeof a === "object" ? JSON.stringify(a) : a))
    .join(" ");

  const logLine = `${time} [${level.toUpperCase()}] ${message}`;
  console.log(logLine);

  const logFile = join(LOG_DIR, `${date}.log`);
  appendFileSync(logFile, logLine + "\n");
};

export const logger = {
  debug: (...args: any[]) => currentLevel <= 0 && writeLog("debug", ...args),
  info: (...args: any[]) => currentLevel <= 1 && writeLog("info", ...args),
  warn: (...args: any[]) => currentLevel <= 2 && writeLog("warn", ...args),
  error: (...args: any[]) => currentLevel <= 3 && writeLog("error", ...args),
};
