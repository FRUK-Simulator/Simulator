import { FunctionComponent, ReactNode } from "react";
import "./Container.css";

export const Container: FunctionComponent<{
  className?: string;
  children: ReactNode;
}> = ({ children, className = "" }) => (
  <div className={`container ${className}`}>{children}</div>
);
