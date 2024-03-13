import { useState } from "react";
import styles from "./Header.module.css";
import { Icon } from "./Icon";

interface IHeaderProps {
  title: string;
  updateSearchQuery: (query: string) => void;
  movies: string[];
}

export const Header = ({ title, updateSearchQuery, movies }: IHeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className={styles.header}>
      <Icon
        onClick={() => {
          updateSearchQuery("");
          setShowSearch(false);
        }}
        size={18}
        iconUrl="https://test.create.diagnal.com/images/Back.png"
      />
      {!showSearch ? (
        title
      ) : (
        <>
          <input
            list="movies"
            className={styles.searchInput}
            autoFocus={true}
            onInput={(event) => updateSearchQuery(event.currentTarget.value)}
          />
          <datalist id="movies">
            {movies.map((name) => (
              <option value={name} />
            ))}
          </datalist>
        </>
      )}

      {!showSearch && (
        <Icon
          onClick={() => setShowSearch(true)}
          floatRight={true}
          size={18}
          iconUrl="https://test.create.diagnal.com/images/search.png"
        />
      )}
    </div>
  );
};
