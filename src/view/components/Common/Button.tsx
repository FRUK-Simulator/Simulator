import React, { FunctionComponent, HTMLAttributes } from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import { IconName, Icon } from "./Icon";

function getButtonClass(disabled: boolean) {
  if (disabled) {
    return "btn btn--disabled";
  }

  return "btn";
}

export const Button: FunctionComponent<
  { iconName?: IconName; disabled?: boolean } & HTMLAttributes<
    HTMLButtonElement
  >
> = ({ children, iconName, disabled = false, ...rest }) => (
  <button className={getButtonClass(disabled)} {...rest}>
    {iconName ? <Icon iconName={iconName} /> : null}
    {children}
  </button>
);

export const LinkButton: FunctionComponent<
  { iconName?: IconName; to: string; disabled?: boolean } & HTMLAttributes<
    HTMLAnchorElement
  >
> = ({ children, to, disabled = false, iconName, ...rest }) => (
  <Link className={getButtonClass(disabled)} to={to} {...rest}>
    {iconName ? <Icon iconName={iconName} /> : null}
    {children}
  </Link>
);

export const ButtonBar: FunctionComponent = ({ children }) => (
  <div className="btn-bar">{children}</div>
);
