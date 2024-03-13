import { useEffect, useMemo, useState } from "react";
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

  const filteredMovies = useMemo(() => {
    if (!searchQuery) return movies;

    return movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  useEffect(() => {
    loadMovies();

    return () => setMovies([]); // clean up
  }, []);

  return (
    <div className={styles.mainContainer} onScroll={handleScroll}>
      <Header
        title="Romantic Comedy"
        updateSearchQuery={(query) => setSearchQuery(query)}
      />

      {filteredMovies.length ? (
        <div className={styles.gridContainer}>
          {filteredMovies.map((movie, index) => (
            <Movie key={index} movie={movie} query={searchQuery} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyBanner}>No Result Found</div>
      )}
    </div>
  );
};
