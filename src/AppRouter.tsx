import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFoundView } from "./ErrorViews/NotFoundView";
import { LandingView } from "./view/views/LandingView";
import { SimulatorView } from "./view/views/SimulatorView";

/**
 * This component provides clientside routing. Top level routes should be defined here.
 */
export const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <LandingView />
      </Route>
      <Route path="/lessons/:lesson/challenges/:challenge/" exact>
        <SimulatorView />
      </Route>
      <Route>
        <NotFoundView />
      </Route>
    </Switch>
  );
};
