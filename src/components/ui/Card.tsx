import React from "react";
import styles from "./Card.module.css";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div
      className={styles.card}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {children}
    </div>
  );
};

export default Card;

