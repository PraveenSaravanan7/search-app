import styles from "./Movie.module.css";
import { IMovie } from "../models/movie";
import { useEffect, useRef, useState } from "react";

interface IMovieProps {
  movie: IMovie;
}

export const Movie = ({ movie }: IMovieProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const src = `https://test.create.diagnal.com/images/${
    isVisible ? movie["poster-image"] : "placeholder_for_missing_posters.png"
  }`;

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
      <img src={src} ref={ref} />
      {movie.name}
    </div>
  );
};
