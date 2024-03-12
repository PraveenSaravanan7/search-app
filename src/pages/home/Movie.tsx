import styles from "./Movie.module.css";
import { IMovie } from "../../models/movie";
import { useEffect, useRef, useState } from "react";

interface IMovieProps {
  movie: IMovie;
}

export const Movie = ({ movie }: IMovieProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const placeholderImageUrl =
    "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png";

  const movieImageUrl = `https://test.create.diagnal.com/images/${movie["poster-image"]}`;

  useEffect(() => {
    if (isVisible || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting)
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div className={styles.movieContainer}>
      <img
        className={styles.movieBanner}
        src={isVisible ? movieImageUrl : placeholderImageUrl}
        onError={(event) => (event.currentTarget.src = placeholderImageUrl)}
        ref={ref}
      />
      <div className={styles.movieName}>{movie.name}</div>
    </div>
  );
};
