import { ApiExchangeDataType } from "./backend/src/types";

interface DefaultApiResponseType {
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

export type ApiDBErrorType = Record<string, DBErrorBodyType>;

export interface ApiErrorType extends DefaultApiResponseType {
  stack?: string;
  errors?: ApiErrorItemType[] | ApiDBErrorType;
}

export interface ApiSuccessType<TData = unknown> extends DefaultApiResponseType {
  data: TData;
}

export type ApiExchangeSuccessDataType = Pick<ApiExchangeDataType, "query" | "info" | "result">;
