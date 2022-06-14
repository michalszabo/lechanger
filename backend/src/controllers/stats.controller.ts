import type { Request, Response } from "express";
import type { ApiErrorType, ApiSuccessType } from "@types";

/**
 * Get exchange stats
 */
const getStats = (_req: Request, res: Response): void => {
  try {
    const responseData: ApiSuccessType = {
      success: true,
      data: "TODO DB CALL"
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
