import { useCallback, useState } from "react";
import { TMakeApiCall } from "../services/types";

export const useMakeApiCall = <T>(makeApiCall: TMakeApiCall<T>) => {
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<T>();

  const execute: TMakeApiCall<T> = useCallback(async (data, options) => {
    try {
      setIsLoading(true);

      const response = await makeApiCall(data, options, pageNo);

      setData(response);
      setPageNo((prev) => prev + 1);

      return response;
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, [makeApiCall, pageNo]);

  return {
    pageNo,
    isLoading,
    error,
    data,
    execute,
  };
};
