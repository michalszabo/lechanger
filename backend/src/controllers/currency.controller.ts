import type { Request, Response } from "express";

/**
 * Get list of available currencies
 */
const getList = async (_req: Request, res: Response): Promise<void> => {
  res.send("GET list");
};

/**
 * Exchange currencies
 */
const exchange = async (req: Request, res: Response): Promise<void> => {
  res.send("POST EXCHANGE");
};

export default { getList, exchange };
