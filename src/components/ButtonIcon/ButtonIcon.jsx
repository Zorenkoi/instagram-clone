import { useState, useEffect } from "react";
import "./ButtonIcon.css";

const ButtonIcon = ({ iconImg, className = "", onClick }) => {
  return (
    <div
      className={`icon-button ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <img src={iconImg} alt="" />
    </div>
  );
};

export default ButtonIcon;
