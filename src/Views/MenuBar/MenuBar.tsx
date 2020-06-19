import React, { FunctionComponent } from "react";
import "./MenuBar.css";
import { VMControls } from "../../JavascriptVM/VMControls";

export const MenuBar: FunctionComponent = () => {
  return (
    <div className="menu-bar">
      <VMControls />
    </div>
  );
};
