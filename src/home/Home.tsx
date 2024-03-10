import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Header } from "../components/Header";
import { useMakeApiCall } from "../hooks/useMakeApiCall";
import * as DiagnalService from "../services/diagnal";
import { Movie } from "./Movie";

export const Home = () => {
  const { execute } = useMakeApiCall<DiagnalService.TGetMoviesResponse>(
    DiagnalService.getMovies
  );

  const [movies, setMovies] = useState<
    DiagnalService.TGetMoviesResponse["page"]["content-items"]["content"]
  >([]);

  useEffect(() => {
    execute()
      .then((response) => {
        if (response?.page["content-items"].content)
          setMovies((prev) => [
            ...prev,
            ...response.page["content-items"].content,
          ]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [execute]);

  return (
    <div className={styles.mainContainer}>
      <Header title="Romantic Comedy" />

      <div className={styles.gridContainer}>
        {movies.map((movie, index) => (
          <Movie key={index} movie={movie} /> // Using index since movie.name is not unique
        ))}
      </div>
    </div>
  );
};
