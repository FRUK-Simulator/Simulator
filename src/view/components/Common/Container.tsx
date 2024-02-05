import { FunctionComponent } from "react";
import "./Container.css";

export const Container: FunctionComponent<{ className?: string }> = ({
  children,
  className = "",
}) => <div className={`container ${className}`}>{children}</div>;
