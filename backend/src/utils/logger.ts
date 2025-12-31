import { env } from "@/config/env.config";

const logLevel = env.LOG_LEVEL || "info";

const levels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel = levels[logLevel as keyof typeof levels] ?? levels.info;

export const logger = {
  debug: (...args: any[]) => {
    if (currentLevel <= levels.debug) console.debug(...args);
  },
  info: (...args: any[]) => {
    if (currentLevel <= levels.info) console.log(...args);
  },
  warn: (...args: any[]) => {
    if (currentLevel <= levels.warn) console.warn(...args);
  },
  error: (...args: any[]) => {
    if (currentLevel <= levels.error) console.error(...args);
  },
};
