import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppRouter } from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { MenuBar } from "./Views/MenuBar/MenuBar";
import { VMProvider } from "./JavascriptVM/JavascriptVM";
import { MessageCenter } from "./ErrorViews/MessageCenter";

/**
 * This is exported seperately so that tests can provide their own providers. This
 * is especially useful for testing history.
 */
export const App: FunctionComponent = () => {
  return (
    <div className="app-container">
      <MenuBar />
      <MessageCenter />
      <AppRouter />
      <div className="footer"></div>
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
