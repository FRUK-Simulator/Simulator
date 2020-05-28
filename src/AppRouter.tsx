import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
        {/* TODO: Break into a view component*/}
        <Blockly />
        <RobotSimulator />
      </Route>
      <Route>
        <NotFoundView />
      </Route>
    </Switch>
  );
};
