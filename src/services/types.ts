export type TMakeApiCall<T = object> = (
  data?: object,
  options?: RequestInit,
  page?: number
) => Promise<T>;
