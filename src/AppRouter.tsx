import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFoundView } from "./ErrorViews/NotFoundView";
import { SimulatorView } from "./SimulatorView/SimulatorView";

/**
 * This component provides clientside routing. Top level routes should be defined here.
 */
export const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <SimulatorView />
      </Route>
      <Route>
        <NotFoundView />
      </Route>
    </Switch>
  );
};
