import { FunctionComponent, HTMLAttributes, ReactNode } from "react";
import "./Button.css";
import { Link, LinkProps } from "react-router-dom";
import { IconName, Icon } from "./Icon";

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonVariant {
  standard = "",
  success = "btn--success",
  info = "btn--info",
  danger = "btn--danger",
  warning = "btn--warning",
}

interface ButtonProps {
  iconPosition?: "top" | "left";
  iconName?: IconName;
  disabled?: boolean;
  variant?: ButtonVariant;
  compact?: boolean;
}

function getButtonClass(buttonProps: ButtonProps) {
  return [
    "btn",
    buttonProps.variant,
    buttonProps.disabled ? "btn--disabled" : null,
    buttonProps.iconPosition === "left" ? "btn--icon-left" : null,
    buttonProps.compact ? "btn--compact" : null,
  ]
    .join(" ")
    .trim();
}

export const Button: FunctionComponent<
  ButtonProps & HTMLAttributes<HTMLButtonElement>
> = ({
  children,
  iconName,
  iconPosition,
  compact,
  variant,
  disabled = false,
  ...rest
}) => (
  <button
    {...rest}
    onClick={(e) => {
      if (!disabled && rest.onClick) {
        rest.onClick(e);
      }
    }}
    className={getButtonClass({
      disabled,
      iconPosition,
      iconName,
      compact,
      variant,
      ...rest,
    })}
  >
    {iconName ? <Icon iconName={iconName} /> : null}
    {children}
  </button>
);

export const LinkButton: FunctionComponent<
  ButtonProps & { to: string } & LinkProps
> = ({
  children,
  to,
  disabled = false,
  iconName,
  iconPosition,
  compact,
  ...rest
}) => (
  <Link
    {...rest}
    onClick={(e) => {
      if (!disabled && rest.onClick) {
        rest.onClick(e);
      }
    }}
    className={getButtonClass({ disabled, iconPosition, compact, ...rest })}
    to={to}
  >
    {iconName ? <Icon iconName={iconName} /> : null}
    {children}
  </Link>
);

export const ButtonBar: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => <div className="btn-bar">{children}</div>;
