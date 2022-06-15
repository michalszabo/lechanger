import type { Request, Response } from "express";
import type { ApiErrorType, ApiSuccessType } from "@types";

import statsService from "../services/stats.service";

/**
 * Get exchange stats
 */
const getStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await statsService.getData();

    const responseData: ApiSuccessType = {
      success: true,
      data
    };

    res.status(200).json(responseData);
  } catch (error) {
    const errorResponse: ApiErrorType = {
      success: false,
      message: "Error while reading stats"
    };

    res.status(500).json(errorResponse);
  }
};

export default { getStats };
