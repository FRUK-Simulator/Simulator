import React from "react";
import "./Header.css";
import { Divider } from "../Common/Divider";
import { Link, useRouteMatch } from "react-router-dom";
import brandImage from "./FIRST_HorzRGB_reverse.png";

export const Brand = () => {
  return (
    <Link to="/">
      <img className="brand" src={brandImage} alt="FIRST Robotics" />
    </Link>
  );
};

export const Header = () => {
  const match = useRouteMatch<{ lesson: string; challenge: string }>({
    path: "/lessons/:lesson/challenges/:challenge/",
    strict: true,
    sensitive: true,
  });

  return (
    <div className="header">
      <Brand />
      <Divider vertical />
      {match ? (
        <h1>
          {match.params.lesson} - {match.params.challenge}
        </h1>
      ) : null}
    </div>
  );
};
