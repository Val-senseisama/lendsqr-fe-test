import React from "react";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "outline";
  block?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  size = "medium",
  variant = "primary",
  block = true,
  className = "",
  disabled,
  ...props
}) => {
  const classes = [
    "btn",
    `btn--${size}`,
    `btn--${variant}`,
    block ? "btn--block" : "",
    isLoading ? "btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
