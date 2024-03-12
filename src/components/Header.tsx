import { useState } from "react";
import styles from "./Header.module.css";
import { Icon } from "./Icon";

interface IHeaderProps {
  title: string;
  updateSearchQuery: (query: string) => void;
}

export const Header = ({ title, updateSearchQuery }: IHeaderProps) => {
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
        <input
          className={styles.searchInput}
          autoFocus={true}
          onInput={(event) => updateSearchQuery(event.currentTarget.value)}
        />
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
