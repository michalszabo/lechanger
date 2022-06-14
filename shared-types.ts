import { ApiExchangeDataType } from "./backend/src/types";

interface DefaultApiResponseType {
  success: boolean;
  message?: string;
}

export interface ApiErrorItemType {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface ApiErrorType extends DefaultApiResponseType {
  stack?: string;
  errors?: ApiErrorItemType[];
}

export interface ApiSuccessType<TData = unknown>
  extends DefaultApiResponseType {
  data: TData;
}

export type ApiExchangeSuccessDataType = Pick<
  ApiExchangeDataType,
  "query" | "info" | "result"
>;
