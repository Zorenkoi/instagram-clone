import { useState, useEffect } from "react";
import "./Input.css";

const Input = ({
  value,
  className,
  onChange,
  name = "name",
  label = "",
  onClick,
}) => {
  if (label) {
    return (
      <div className="input-container">
        <label className="input-label" htmlFor={name}>
          {label}
        </label>

        <input
          value={value}
          onClick={onClick}
          onChange={onChange}
          id={name}
          name={name}
          className={`input ${className}`}
          type="text"
        />
      </div>
    );
  }
  return (
    <input
      name={name}
      className={`input ${className}`}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
