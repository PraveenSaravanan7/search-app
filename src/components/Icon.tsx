import styles from "./Icon.module.css";

interface IIconProps {
  onClick?: () => void;
  size: number;
  iconUrl: string;
  floatRight?: boolean;
}

export const Icon = ({
  size,
  iconUrl,
  floatRight = false,
  onClick = () => {},
}: IIconProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.icons} ${floatRight ? styles.floatRight : ""}`}
      style={{ width: size }}
    >
      <img src={iconUrl} />
    </div>
  );
};
