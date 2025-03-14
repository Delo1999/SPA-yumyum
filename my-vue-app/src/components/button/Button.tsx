import React from "react";
import "./Button.scss";

type ButtonProps = {
  children: React.ReactNode;
  backgroundColor: string;
  color: string;
  border?: string;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  children,
  backgroundColor,
  color,
  border = "none",
  onClick,
  className = "",
}: ButtonProps): React.JSX.Element => {
  return (
    <button
      className={className}
      style={{ backgroundColor: backgroundColor, color: color, border }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
