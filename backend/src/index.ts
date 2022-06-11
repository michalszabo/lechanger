import path from "path";
import express, { Express } from "express";
import dotenv from "dotenv";

// Development env config
if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: path.join(__dirname, "..", "config", ".env.dev")
  });
}

// Express app instance
const app: Express = express();

const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Express BE test hit");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
