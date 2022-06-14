import express from "express";
import { check } from "express-validator";

import currencyController from "../controllers/currency.controller";

const router = express.Router();

/* GET available currencies */
router.get("/list", currencyController.getList);

/* POST exchange currency */
router.post(
  "/exchange",
  [
    // Check for "amount"
    check("amount")
      .exists()
      .withMessage("Exchange request must contain 'amount'")
      .bail()
      .isNumeric()
      .withMessage("'amount' must be a number"),
    // Check for "originalCurrency" and "originalCurrency"
    check(["originalCurrency", "destinationCurrency"])
      .exists()
      .withMessage((_, { path }) => `Exchange request must contain '${path}'`)
      .bail()
      .isString()
      .withMessage((_, { path }) => `'${path}' must be a string`)
      .bail()
      .isLength({ min: 3, max: 3 })
      .withMessage((_, { path }) => `'${path}' must be 3-letter code`)
  ],
  currencyController.exchange
);

export default router;
