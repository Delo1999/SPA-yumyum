import React from "react";
import "./Button.scss";

type ButtonProps = {
  children: React.ReactNode;
  backgroundColor: string;
  color: string;
  border?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  backgroundColor,
  color,
  border = "none",
  onClick,
}: ButtonProps): React.JSX.Element => {
  return (
    <button
      className="btn"
      style={{ backgroundColor: backgroundColor, color: color, border }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
