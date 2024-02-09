import { FunctionComponent, ReactNode } from "react";
import "./Card.css";
import { As } from "./Utilities/As";

export const Card: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => <div className="card">{children}</div>;

export const CardImage: FunctionComponent<
  { src: string } & { imgProps?: React.HTMLAttributes<HTMLImageElement> }
> = ({ src, imgProps = {} }) => (
  <div className="card--image-container">
    <img alt="" {...imgProps} className="card--image" src={src} />
  </div>
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

export const CardBody: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return <div className="card--body">{children}</div>;
};
