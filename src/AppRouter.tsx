import React from "react";
import { Switch, Route } from "react-router-dom";
import { Blockly } from "./BlocklyInterface/Blockly";
import { RobotSimulator } from "./RobotSimulator/RobotSimulator";
import { NotFoundView } from "./ErrorViews/NotFoundView";

/**
 * This component provides clientside routing. Top level routes should be defined here.
 */
export const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <div className="grid-container">
          <div className="menu-bar"></div>
          {/* TODO: Break into a view component*/}
          <Blockly />
          <RobotSimulator />
          <div className="control-panel"></div>
          <div className="footer"></div>
        </div>
      </Route>
      <Route>
        <NotFoundView />
      </Route>
    </Switch>
  );
};
