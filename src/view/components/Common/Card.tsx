import React, { FunctionComponent } from "react";
import "./Card.css";
import { As } from "./Utilities/As";

export const Card: FunctionComponent = ({ children }) => (
  <div className="card">{children}</div>
);

export const CardImage: FunctionComponent<
  { src: string } & { imgProps?: React.HTMLAttributes<HTMLImageElement> }
> = ({ src, imgProps = {} }) => (
  <img alt="" {...imgProps} className="card--image" src={src} />
);

export const CardTitle: FunctionComponent<{
  title: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}> = ({ title, as }) => {
  const className = "card--title";
  return (
    <As as={as} className={className}>
      {title}
    </As>
  );
};

export const CardBody: FunctionComponent = ({ children }) => {
  return <div className="card--body">{children}</div>;
};
