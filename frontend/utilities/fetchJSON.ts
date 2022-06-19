import { toast } from "react-toastify";

import type { ApiErrorType, DefaultApiResponseType } from "@shared-types";

type Settings = {
  url: string;
  method: "POST" | "GET";
  body?: string | FormData;
  // eslint-disable-next-line no-undef
  headers?: HeadersInit;
  signal?: AbortSignal;
};

const fetchJSON = async <T extends DefaultApiResponseType>(
  settings: Settings,
  // eslint-disable-next-line no-undef
  headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  withToastError = false
): Promise<T | ApiErrorType> => {
  // eslint-disable-next-line no-undef
  const config: RequestInit = {
    method: settings.method,
    body: settings.body || null
  };

  if (headers) {
    config.headers = headers;
  }

  const requestURL = `${process.env.NEXT_PUBLIC_API_URL}${settings.url}`;

  try {
    const responseJSON = await fetch(requestURL, config);
    const response = await responseJSON.json();

    if (response?.success) return response as T;

    throw response;
  } catch (error) {
    const errorMsg =
      (error as Error).message ?? "Something went terribly wrong :(";

    if (withToastError) {
      toast(errorMsg, { autoClose: 5000 });
    }

    const resError: ApiErrorType = {
      ...(error as Error),
      success: false,
      message: errorMsg
    };

    throw resError;
  }
};

export default fetchJSON;
