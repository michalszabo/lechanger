import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  const error: Error = new Error(`Not Found - ${req.originalUrl}`);

  res.status(404);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "💔" : error.stack
  });
};

export default notFound;
