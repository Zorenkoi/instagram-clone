import React from "react";
import { motion } from "framer-motion";
import "./Logo.css";
import { Link } from "react-router-dom";

const Logo = () => {
  const variants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        duration: 0.2,
      }}
    >
      <Link className="h1" to={"/"}>
        Goober
      </Link>
    </motion.div>
  );
};

export default Logo;
