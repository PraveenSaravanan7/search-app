import styles from "./Movie.module.css";
import { IMovie } from "../../models/movie";
import { useEffect, useRef, useState } from "react";
import { highlightText } from "../../utils/common";

interface IMovieProps {
  movie: IMovie;
  query: string;
}

export const Movie = ({ movie, query }: IMovieProps) => {
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
      <div
        className={styles.movieName}
        dangerouslySetInnerHTML={{ __html: highlightText(movie.name, query) }}
      ></div>
    </div>
  );
};
