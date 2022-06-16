import { ApiExchangeDataType } from "./backend/src/types";

export interface DefaultApiResponseType {
  success: boolean;
  message?: string | null;
}

export interface ApiErrorItemType {
  value: string;
  msg: string;
  param: string;
  location: string;
}

// Only important info for response
interface DBErrorBodyType {
  name: string;
  message: string;
}

export interface ApiErrorType extends DefaultApiResponseType {
  stack?: string;
  errors?: ApiErrorItemType[];
}

export interface ApiSuccessType<TData = unknown> extends DefaultApiResponseType {
  data: TData;
}

export type ApiExchangeSuccessDataType = Pick<ApiExchangeDataType, "query" | "info" | "result">;

export interface ApiTopDestinationCurrencyType {
  _id: string;
  count: number;
}

export interface ApiStatsDataType {
  topDestinationCurrency: ApiTopDestinationCurrencyType;
  totalAmountConvertedUSD: number;
  conversionsLength: number;
}
