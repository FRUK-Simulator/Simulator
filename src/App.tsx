import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { AppRouter } from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { VMProvider } from "./JavascriptVM/JavascriptVM";
import { Header } from "./view/components/Header/Header";

/**
 * This is exported seperately so that tests can provide their own providers. This
 * is especially useful for testing history.
 */
export const App: FunctionComponent = () => {
  return (
    <div className="app-container">
      <Header />
      <AppRouter />
    </div>
  );
};

const AppWithProviders: FunctionComponent = () => {
  return (
    <Router>
      <Provider store={store}>
        <VMProvider>
          <App />
        </VMProvider>
      </Provider>
    </Router>
  );
};

export default AppWithProviders;
