import { IMovie } from "../models/movie";
import { TMakeApiCall } from "./types";

interface IResponse<T> {
  page: {
    title: string;
    "total-content-items": string;
    "page-num-requested": string;
    "page-size-requested": string;
    "page-size-returned": string;
    "content-items": {
      content: T[];
    };
  };
}


export type TGetMoviesResponse = IResponse<IMovie>;

export const getMovies: TMakeApiCall<TGetMoviesResponse> = async (
  _,
  options = {},
  page = 1
) => {
  const response = await fetch(
    `https://test.create.diagnal.com/data/page${page}.json`,
    {
      ...options,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseData = await response.json();

  return responseData as TGetMoviesResponse;
};
