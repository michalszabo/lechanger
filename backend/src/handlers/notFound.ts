import type { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error(`Not Found - ${req.originalUrl}`);

  res.status(404);

  return next(error);
};

export default notFound;
