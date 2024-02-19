import { Routes, Route } from "react-router-dom";
import { NotFoundView } from "../ErrorViews/NotFoundView";
import { LandingView } from "./views/LandingView";
import { SimulatorView } from "./views/SimulatorView";

/**
 * This component provides clientside routing. Top level routes should be defined here.
 */
export const AppRouterLegacy = () => {
  return (
    <Routes>
      <Route index element={<LandingView />} />
      <Route
        path="lessons/:lesson/challenges/:challenge/"
        element={<SimulatorView />}
      />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};
