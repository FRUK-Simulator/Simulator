import React, { FunctionComponent } from "react";
import "./Button.css";
import { Link } from "react-router-dom";

enum Icon {}

export const Button: FunctionComponent<{ iconName?: Icon; to?: string }> = ({
  children,
  to,
}) =>
  to ? (
    <Link className="btn" to={to}>
      {children}
    </Link>
  ) : (
    <button className="btn">{children}</button>
  );

export const ButtonBar: FunctionComponent = ({ children }) => (
  <div className="btn-bar">{children}</div>
);
