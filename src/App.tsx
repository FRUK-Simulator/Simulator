import { FunctionComponent, Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./state/store";
import { VMProvider } from "./JavascriptVM/JavascriptVM";
import { DialogProvider } from "./view/components/Dialog/Dialog";
import { KobotThemeProvider } from "./ui/KobotThemeProvider";
import { queryClient } from "./hooks/query-hooks";

// During the transition to 2024 new design, we are lazy loading
// legacy and new apps side by side here so each module can load
// and unload it's own styles in isolation, which helps keep the
// legacy app functional as a reference
const LazyAppLegacy = lazy(() => import("./view/AppLegacy"));
const LazyAppRoutes = lazy(() => import("./AppRoutes"));

/**
 * This is exported seperately so that tests can provide their own providers. This
 * is especially useful for testing history.
 */
export const App: FunctionComponent = () => {
  return (
    <Routes>
      <Route
        path="legacy/*"
        element={
          <Suspense fallback={<>Loading...</>}>
            <LazyAppLegacy />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<>Loading...</>}>
            <LazyAppRoutes />
          </Suspense>
        }
      />
    </Routes>
  );
};

export const AppWithProviders: FunctionComponent = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <VMProvider>
            <KobotThemeProvider>
              <DialogProvider>
                <App />
              </DialogProvider>
            </KobotThemeProvider>
          </VMProvider>
        </Provider>
      </QueryClientProvider>
    </Router>
  );
};
