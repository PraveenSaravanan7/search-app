import styles from "./Icon.module.css";

interface IIconProps {
  size: number;
  iconUrl: string;
  floatRight?: boolean;
}

export const Icon = ({ size, iconUrl, floatRight = false }: IIconProps) => {
  return (
    <div
      className={`${styles.icons} ${floatRight ? styles.floatRight : ""}`}
      style={{ width: size }}
    >
      <img src={iconUrl} />
    </div>
  );
};
