import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppRouter } from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

/**
 * This is exported seperately so that tests can provide their own providers. This
 * is especially useful for testing history.
 */
export const App: FunctionComponent = () => {
  return (
    <div className="App">
      <AppRouter />
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
