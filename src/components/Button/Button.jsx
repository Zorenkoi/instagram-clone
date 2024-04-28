import { useState, useEffect } from "react";
import "./Button.css";

const Button = ({ children, onClick, className, ...rest }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
