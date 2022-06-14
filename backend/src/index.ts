import path from "path";
import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";

import notFound from "./handlers/notFound";
import connectDb from "./services/db.service";
import CurrencyRoute from "./routes/currency";

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

// 404 handler
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
