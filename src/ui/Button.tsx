import { forwardRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import iconGo from "./icon-go.svg";

type ButtonType = "primary" | "primary-blue" | "secondary" | "tertiary";

const StyledButton = styled.button<{
  $type: ButtonType;
}>`
  outline: 0;
  appearance: none;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  padding: var(--spacing) var(--spacing-large);
  color: var(--color-text-alt);
  border-width: 0;
  border-radius: var(--border-radius-small);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-default);
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: var(--duration-promptly) all ease;
  position: relative;
  text-decoration: none;
  font-family: var(--font-family-heading);
  white-space: nowrap;

  ${(props) =>
    props.$type === "primary" &&
    `
    box-shadow: 5px 5px 0 0 #000000;
    text-transform: uppercase;
    background-color: var(--color-red);
    color: var(--color-white);
    &:hover {
      background-color: var(--color-red-light);
    }
  `}

  ${(props) =>
    props.$type === "primary-blue" &&
    `
    box-shadow: 5px 5px 0 0 #000000;
    text-transform: uppercase;
    background-color: var(--color-blue-dark);
    color: var(--color-white);
    &:hover {
      background-color: var(--color-blue-mid);
    }
  `}

  ${(props) =>
    props.$type === "secondary" &&
    `
    text-transform: uppercase;
    border: 3px solid var(--color-blue-dark);
    background-color: var(--color-white);
    color: var(--color-blue-dark);
    &:hover {
      background-color: var(--color-grey-mid);
    }
  `}

  ${(props) =>
    props.$type === "tertiary" &&
    `
    background-color: var(--color-white);
    color: var(--color-blue-dark);
    &:hover {
      text-decoration: underline 2px;
    }
  `}
`;

const IconGo = styled.img`
  margin-left: 10px;
  width: 14;
  height: 14;
`;

type Props = {
  children: ReactNode;
  /**
   *  Convert this button to a link button
   *  takes priority over onClick prop
   */
  to?: string;
  onClick?: () => void;
  type?: ButtonType;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, to, onClick, type = "primary" }, ref) => {
    const navigate = useNavigate();
    return (
      <StyledButton
        $type={type}
        ref={ref}
        onClick={to ? () => navigate(to) : onClick}
      >
        {children}
        {type === "tertiary" && <IconGo src={iconGo} />}
      </StyledButton>
    );
  },
);
