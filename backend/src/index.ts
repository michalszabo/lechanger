import path from "path";
import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";

import { notFound, errorHandler } from "./handlers";
import connectDb from "./services/db.service";
import CurrencyRoute from "./routes/currency";
import StatsRoute from "./routes/stats";

// Development env config
if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: path.join(__dirname, "..", "config", ".env.dev")
  });
}

// Express app instance
const app: Express = express();

app.use(express.json());

// DB connector
connectDb();

// Routes
app.use("/api/currency/", CurrencyRoute);
app.use("/api/stats/", StatsRoute);

// 404 handler
app.use(notFound);
// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
