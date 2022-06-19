import { useState } from "react";

import type {
  ApiExchangeSuccessDataType,
  ApiErrorType,
  ApiSuccessType
} from "@shared-types";
import { fetchJSON } from "@/utilities";

import type { FormFieldsType } from "../types";

type ApiExchangeResponseType = ApiSuccessType<ApiExchangeSuccessDataType>;

interface Output {
  isLoading: boolean;
  data: ApiExchangeSuccessDataType | null;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: FormFieldsType) => Promise<void>;
  error: ApiErrorType | null;
}

const useExchangeCurrency = (): Output => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ApiExchangeSuccessDataType | null>(null);
  const [error, setError] = useState<ApiErrorType | null>(null);

  const handleSuccess = (response: ApiExchangeSuccessDataType): void => {
    setError(null);
    setData(response);

    setIsLoading(false);
  };

  const handleError = (errorResponse: ApiErrorType): void => {
    setError(errorResponse);

    setIsLoading(false);
  };

  const handleSubmit = async (values: FormFieldsType): Promise<void> => {
    setIsLoading(true);

    try {
      const response = (await fetchJSON({
        url: "/currency/exchange",
        method: "POST",
        body: JSON.stringify(values)
      })) as ApiExchangeResponseType;

      handleSuccess(response.data);
    } catch (err) {
      handleError(err as ApiErrorType);
    }
  };

  return {
    data,
    error,
    handleSubmit,
    isLoading
  };
};

export default useExchangeCurrency;
