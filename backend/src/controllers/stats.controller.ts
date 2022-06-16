import type { Request, Response, NextFunction } from "express";
import type { ApiSuccessType } from "@types";

import statsService from "../services/stats.service";

/**
 * Get exchange stats
 */
const getStats = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await statsService.getData();

    const responseData: ApiSuccessType = {
      success: true,
      data
    };

    res.status(200).json(responseData);
  } catch (error) {
    (error as Error).message = "Error while reading stats";

    next(error);
  }
};

export default { getStats };
