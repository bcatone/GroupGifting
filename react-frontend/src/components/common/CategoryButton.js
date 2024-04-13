import React from "react";
import Button from "@mui/material/Button";

const CategoryButton = ({
  children,
  color,
  disabled,
  size,
  variant,
  onClick,
  style,
  value,
  backgroundColor,
  className,
  type = "button",
  disableHover = false,
}) => {
  const darkenColor = (color, percent) => {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const r = (num >> 16) - amt;
    const g = ((num >> 8) & 0x00ff) - amt;
    const b = (num & 0x0000ff) - amt;
    return (
      "#" +
      (
        0x1000000 +
        (r < 255 ? (r < 1 ? 0 : r) : 255) * 0x10000 +
        (g < 255 ? (g < 1 ? 0 : g) : 255) * 0x100 +
        (b < 255 ? (b < 1 ? 0 : b) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  const buttonStyles = {
    backgroundColor: backgroundColor || "#CFB784", // Default color if not provided
    color: "#4A2723",
    textTransform: "none",
  "&:focus, &:active": {
    outline: "none",
  },
    "&:hover": {
      color: "#FDF4DC",
      backgroundColor: disableHover
        ? backgroundColor
        : darkenColor(backgroundColor, 0.2),
    },
    borderRadius: 100,
    border: "2px solid #C56824",
    margin: "5px",
    pointerEvents: disableHover ? "none" : "auto",
  };

  // Function to darken a color by a specified percentage

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
      value={value}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CategoryButton;
