import path from "path";
import fs from "fs";
import { validationResult } from "express-validator";
import axios from "axios";

import type { Request, Response } from "express";
import type {
  ApiErrorItemType,
  ApiErrorType,
  ApiExchangeSuccessDataType,
  ApiSuccessType
} from "@types";
import type { ApiExchangeDataType } from "../types";

/**
 * Get list of available currencies
 */
const getList = (_req: Request, res: Response): void => {
  try {
    const currenciesList = fs.readFileSync(
      path.join(__dirname, "..", "data", "currenciesList.json"),
      "utf-8"
    );

    const parsedList = JSON.parse(currenciesList);
    const responseData: ApiSuccessType = {
      success: true,
      data: parsedList
    };

    res.status(200).json(responseData);
  } catch (error) {
    const errorResponse: ApiErrorType = {
      success: false,
      message: "Error while reading available currencies data"
    };

    res.status(500).json(errorResponse);
  }
};

/**
 * Exchange currencies
 */
const exchange = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errResponse: ApiErrorType = {
      success: false,
      errors: errors.array() as ApiErrorItemType[]
    };

    res.status(400).json(errResponse);
    return;
  }

  // Keys and values are checked with express-validator middleware
  const { amount, originalCurrency, destinationCurrency } = req.body;
  const USD_CURRENCY_KEY = "USD";

  // https://exchangerate.host/#/#our-services
  const EXCHANGE_API_URL = "https://api.exchangerate.host/convert";

  let usdAmount = null;

  if (originalCurrency === "USD_CURRENCY_KEY") {
    usdAmount = amount;
  }

  try {
    // Exchange to USD for later storage (zero check with express-validator)
    if (!usdAmount) {
      const usdResponse = await axios.get(
        `${EXCHANGE_API_URL}?amount=${amount}&from=${originalCurrency}&to=${USD_CURRENCY_KEY}`
      );

      const { success, result } = usdResponse.data as ApiExchangeDataType;

      if (!success)
        throw Error("Exchange to USD (stats) failed on external API");

      usdAmount = result;
    }

    const response = await axios.get(
      `${EXCHANGE_API_URL}?amount=${amount}&from=${originalCurrency}&to=${destinationCurrency}`
    );

    const { success, query, info, result } =
      response.data as ApiExchangeDataType;

    if (!success) throw Error("Exchange failed on external API");

    const responseData: ApiSuccessType<ApiExchangeSuccessDataType> = {
      success: true,
      data: {
        query,
        info,
        result
      }
    };

    // TODO Save data to DB

    res.status(200).json(responseData);
  } catch (error) {
    const errorResponse: ApiErrorType = {
      success: false,
      message: error as string
    };

    res.status(500).json(errorResponse);
  }
};

export default { getList, exchange };
