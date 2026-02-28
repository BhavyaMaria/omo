import React from "react";
import styles from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const Button: React.FC<Props> = ({ variant = "primary", className, ...rest }) => {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");
  return <button className={classes} {...rest} />;
};

export default Button;

