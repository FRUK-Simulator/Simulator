import React, { FunctionComponent } from "react";
import { JavascriptVM } from "../../JavascriptVM/JavascriptVM";
import "./MenuBar.css";

export const MenuBar: FunctionComponent = () => {
  return (
    <div className="menu-bar">
      <JavascriptVM />
    </div>
  );
};
