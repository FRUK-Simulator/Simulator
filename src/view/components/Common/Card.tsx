import React, { FunctionComponent } from "react";
import "./Card.css";

export const Card: FunctionComponent = ({ children }) => (
  <div className="card">{children}</div>
);

export const CardImage: FunctionComponent<
  { src: string } & { imgProps?: React.HTMLAttributes<HTMLImageElement> }
> = ({ src, imgProps }) => (
  <img {...(imgProps ?? {})} className="card--image" src={src} />
);

export const CardTitle: FunctionComponent<{
  title: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}> = ({ title, as }) => {
  const renderMap: Record<typeof as, React.ReactElement> = {
    h1: <h1 className="card--title">{title}</h1>,
    h2: <h2 className="card--title">{title}</h2>,
    h3: <h3 className="card--title">{title}</h3>,
    h4: <h4 className="card--title">{title}</h4>,
    h5: <h5 className="card--title">{title}</h5>,
    h6: <h6 className="card--title">{title}</h6>,
  };

  return renderMap[as];
};

export const CardBody: FunctionComponent = ({ children }) => {
  return <div className="card--body">{children}</div>;
};
