import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppRouter } from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { MenuBar } from "./Views/MenuBar/MenuBar";

/**
 * This is exported seperately so that tests can provide their own providers. This
 * is especially useful for testing history.
 */
export const App: FunctionComponent = () => {
  return (
    <div className="app-container">
      <MenuBar />
      <AppRouter />
      <div className="footer"></div>
    </div>
  );
};

const AppWithProviders: FunctionComponent = () => {
  return (
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
};

export default AppWithProviders;
