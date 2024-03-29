import { FunctionComponent, ReactNode } from "react";
import { As, Headings } from "./Utilities/As";
import "./Title.css";

export const Title: FunctionComponent<{
  as: Headings;
  divider?: boolean;
  children: ReactNode;
}> = ({ children, as, divider }) => {
  return (
    <As as={as} className={`title ${divider ? "title--divider" : ""}`}>
      {children}
    </As>
  );
};
