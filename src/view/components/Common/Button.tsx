import React, { FunctionComponent, HTMLAttributes } from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import { IconName, Icon } from "./Icon";

export enum ButtonVariant {
  standard = "",
  success = "btn--success",
  info = "btn--info",
  danger = "btn--danger",
  warning = "btn--warning",
}

interface ButtonProps {
  iconName?: IconName;
  disabled?: boolean;
  variant?: ButtonVariant;
}

function getButtonClass(buttonProps: ButtonProps) {
  return [
    "btn",
    buttonProps.variant,
    buttonProps.disabled ? "btn--disabled" : null,
  ]
    .join(" ")
    .trim();
}

export const Button: FunctionComponent<
  ButtonProps & HTMLAttributes<HTMLButtonElement>
> = ({ children, iconName, disabled = false, ...rest }) => (
  <button className={getButtonClass({ disabled, ...rest })} {...rest}>
    {iconName ? <Icon iconName={iconName} /> : null}
    {children}
  </button>
);

export const LinkButton: FunctionComponent<
  ButtonProps & { to: string } & HTMLAttributes<HTMLAnchorElement>
> = ({ children, to, disabled = false, iconName, ...rest }) => (
  <Link className={getButtonClass({ disabled, ...rest })} to={to} {...rest}>
    {iconName ? <Icon iconName={iconName} /> : null}
    {children}
  </Link>
);

export const ButtonBar: FunctionComponent = ({ children }) => (
  <div className="btn-bar">{children}</div>
);
