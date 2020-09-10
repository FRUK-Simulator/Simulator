import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFoundView } from "./ErrorViews/NotFoundView";
import { SimulatorView } from "./Views/SimulatorView";
import { LandingView } from "./view/views/LandingView";

/**
 * This component provides clientside routing. Top level routes should be defined here.
 */
export const AppRouter = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <LandingView />
      </Route>
      <Route path="/lesson/:lesson/challenge/:challenge" exact>
        <SimulatorView />
      </Route>
      <Route>
        <NotFoundView />
      </Route>
    </Switch>
  );
};
