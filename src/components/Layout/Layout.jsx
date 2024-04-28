import React from "react";
import "./Layout.css";

import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />

      <div className="container">
        <div className="main">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
