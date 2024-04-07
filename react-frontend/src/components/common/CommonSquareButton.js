import React from "react";
import Button from "@mui/material/Button";

const CommonSquareButton = ({
  children,
  color,
  disabled,
  size,
  variant,
  onClick,
  style,
  type = "button",
}) => {
  const buttonStyles = {
    backgroundColor: "#404442",
    color: "#FFFDD0",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#333534 ",
    },
  };

  return (
    <Button
      style={style}
      color={color}
      disabled={disabled}
      size={size}
      variant={variant}
      sx={buttonStyles}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
};

export default CommonSquareButton;
