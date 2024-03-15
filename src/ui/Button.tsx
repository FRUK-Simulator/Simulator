import { forwardRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  text-transform: uppercase;
  cursor: pointer;
  transition: var(--duration-promptly) all ease;
  position: relative;
  text-decoration: none;
  box-shadow: 5px 5px 0 0 #000;
  font-family: var(--font-family-heading);
  white-space: nowrap;

  ${(props) =>
    props.$type === "primary" &&
    `
    background-color: var(--color-red);
    color: var(--color-white);
    &:hover {
      background-color: var(--color-red-light);
    }
  `}

  ${(props) =>
    props.$type === "primary-blue" &&
    `
    background-color: var(--color-blue-dark);
    color: var(--color-white);
    &:hover {
      background-color: var(--color-blue-mid);
    }
  `}
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
      </StyledButton>
    );
  },
);
