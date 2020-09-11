import React, { FunctionComponent } from "react";
import "./Button.css";

enum Icon {}

export const Button: FunctionComponent<{ iconName?: Icon }> = ({
  children,
}) => <button className="btn">{children}</button>;

export const ButtonBar: FunctionComponent = ({ children }) => (
  <div className="btn-bar">{children}</div>
);
