import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Header } from "../../components/Header";
import { useMakeApiCall } from "../../hooks/useMakeApiCall";
import { TGetMoviesResponse, getMovies } from "../../services/diagnal";
import { Movie } from "./Movie";

export const Home = () => {
  const { execute, isLoading } = useMakeApiCall<TGetMoviesResponse>(getMovies);

  const [movies, setMovies] = useState<
    TGetMoviesResponse["page"]["content-items"]["content"]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [reachedEnd, setReachedEnd] = useState(false);

  const loadMovies = async () => {
    try {
      if (reachedEnd) return;

      const response = await execute();

      setMovies((prev) => [...prev, ...response.page["content-items"].content]);

      setReachedEnd(
        movies.length + response.page["content-items"].content.length ===
          +response.page["total-content-items"]
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const threshold = 100;
    const isBottomReached =
      scrollTop + clientHeight >= scrollHeight - threshold;

    if (isBottomReached) loadMovies();
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className={styles.mainContainer} onScroll={handleScroll}>
      <Header
        title="Romantic Comedy"
        updateSearchQuery={(query) => setSearchQuery(query)}
      />

      <div className={styles.gridContainer}>
        {movies.map((movie, index) => {
          if (
            !searchQuery ||
            movie.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
            return <Movie key={index} movie={movie} />;

          return <></>;
        })}
      </div>
    </div>
  );
};
