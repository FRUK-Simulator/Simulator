import React, { FunctionComponent } from "react";
import { As } from "./Utilities/As";
import "./List.css";

export const List: FunctionComponent = ({ children }) => {
  return <ul className="list">{children}</ul>;
};

export const ListItem: FunctionComponent = ({ children }) => {
  return <li className="list--item">{children}</li>;
};

export const ListItemHeader: FunctionComponent<{
  title: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}> = ({ as, title }) => {
  const className = "list--item__title";
  return (
    <As as={as} className={className}>
      {title}
    </As>
  );
};

export const ListItemContent: FunctionComponent = ({ children }) => {
  return <p className="list--item__content">{children}</p>;
};
