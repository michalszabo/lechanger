import type { Request, Response, NextFunction } from "express";
import type { ApiErrorType } from "@shared-types";

const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction
) => {
  const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;

  const errorMessage: ApiErrorType = {
    success: false,
    message: error.message,
    errors: error.errors ?? [],
    stack: process.env.NODE_ENV === "production" ? "💔" : error.stack
  };

  return res.status(statusCode).json(errorMessage);
};

export default errorHandler;
