import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import slowDown from "express-slow-down";

import type { Express } from "express";

import { notFound, errorHandler } from "./handlers";
import connectDb from "./services/db.service";
import CurrencyRoute from "./routes/currency";
import StatsRoute from "./routes/stats";

/* Development env config */
if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: path.join(__dirname, "..", "config", ".env.dev")
  });
}

/* Express app instance */
const app: Express = express();
app.use(express.json());

/* API secure */

// Allow CORS
app.use(cors());

// Secure Express app by setting or removing some HTTP headers (X-Powered-By, ..)
app.use(helmet());

// Speed limiter
const speedLimiter = slowDown({
  windowMs: 60 * 1000, // 1 minute
  delayAfter: 20, // Delay after 20 requests in 1 minute
  delayMs: 500 // Every next request within that minute will take + 500 another ms
});
app.use(speedLimiter);

/* DB connector */
connectDb();

/* Routes */
app.use("/api/currency/", CurrencyRoute);
app.use("/api/stats/", StatsRoute);

// 404 handler
app.use(notFound);
// Error handler
app.use(errorHandler);

/* Server start */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
