import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Blockly } from "./BlocklyInterface/Blockly";
import { RobotSimulator } from "./RobotSimulator/RobotSimulator";

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
            {/* TODO: Break into a view component*/}
          <Blockly />
          <RobotSimulator />
        </Route>
        <Route>
            {/* TODO: Break into a 404 component */}
            <div>
                404 - Page Not Found
            </div>
        </Route>
      </Switch>
    </Router>
  );
};
