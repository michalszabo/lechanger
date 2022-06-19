import { useState } from "react";
import { useToast } from "@chakra-ui/react";

import type {
  ApiErrorType,
  ApiStatsDataType,
  ApiSuccessType
} from "@shared-types";

import { fetchJSON } from "@/utilities";

type ApiExchangeResponseType = ApiSuccessType<ApiStatsDataType>;

interface Props {
  defaultData: ApiStatsDataType;
}

interface Output {
  data: ApiStatsDataType;
  isLoading: boolean;
  handleUpdateStats: () => Promise<void>;
}

const useExchangeStats = ({ defaultData }: Props): Output => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(defaultData);

  const handleSuccess = (response: ApiStatsDataType): void => {
    setData(response);

    setIsLoading(false);
  };

  const handleError = (errorResponse: ApiErrorType): void => {
    toast({
      title: "Error",
      description: errorResponse.message,
      status: "error",
      duration: 9000,
      isClosable: true
    });

    setIsLoading(false);
  };

  const handleUpdateStats = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const response = (await fetchJSON({
        url: "/stats",
        method: "GET"
      })) as ApiExchangeResponseType;

      handleSuccess(response.data);
    } catch (err) {
      handleError(err as ApiErrorType);
    }
  };

  return {
    data,
    handleUpdateStats,
    isLoading
  };
};

export default useExchangeStats;
