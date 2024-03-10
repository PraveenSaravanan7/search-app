import styles from "./Header.module.css";
import { Icon } from "./Icon";

interface IHeaderProps {
  title: string;
}

export const Header = ({ title }: IHeaderProps) => {
  return (
    <div className={styles.header}>
      <Icon
        size={18}
        iconUrl="https://test.create.diagnal.com/images/Back.png"
      />
      {title}
      <Icon
        floatRight={true}
        size={18}
        iconUrl="https://test.create.diagnal.com/images/search.png"
      />
    </div>
  );
};
