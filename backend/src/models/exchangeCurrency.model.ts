import { Schema, Document, model } from "mongoose";

const ExchangeCurrencySchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  originalCurrency: {
    type: String,
    required: true
  },
  destinationCurrency: {
    type: String,
    requred: true
  },
  usdAmount: {
    type: Number,
    required: true
  }
});

export interface IExchangeCurrency extends Document {
  amount: number;
  originalCurrency: string;
  destinationCurrency: string;
  usdAmount: number;
}

export default model<IExchangeCurrency>(
  "ExchangeCurrency",
  ExchangeCurrencySchema
);
