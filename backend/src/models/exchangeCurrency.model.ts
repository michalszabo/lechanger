import { Schema, Document, model } from "mongoose";

const ExchangeCurrencySchema = new Schema({
  originalCurrency: {
    type: String,
    required: true
  },
  destinationCurrency: {
    type: String,
    requred: true
  },
  originalAmount: {
    type: Number,
    required: true
  },
  convertedAmount: {
    type: Number,
    required: true
  },
  usdAmount: {
    type: Number,
    required: true
  }
});

export interface ExchangeCurrencyDataType {
  originalCurrency: string;
  destinationCurrency: string;
  originalAmount: number;
  convertedAmount: number;
  usdAmount: number;
}

export type IExchangeCurrency = ExchangeCurrencyDataType & Document;

export default model<IExchangeCurrency>(
  "ExchangeCurrency",
  ExchangeCurrencySchema
);
