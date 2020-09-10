import React from "react";
import "./Header.css";
import { Divider } from "../Common/Divider";
import { Link } from "react-router-dom";
import brandImage from "./FIRST_HorzRGB_reverse.png";

export const Brand = () => {
  return (
    <Link to="/">
      <img className="brand" src={brandImage} />
    </Link>
  );
};

export const Header = () => (
  <div className="header">
    <Brand />
    <Divider vertical />
  </div>
);
