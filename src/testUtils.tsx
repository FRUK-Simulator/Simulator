/**
 * This file provides useful utilities and functions to ease testing. See https://testing-library.com/docs/react-testing-library/setup for
 * more info.
 */
import React, { FunctionComponent } from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { createMemoryHistory, History } from "history";

const AppProviders = (history: History) => ({
  children,
}: {
  children: any;
}) => {
  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

const customRender = (ui: any, options: any = {}) => {
  const history = createMemoryHistory();

  return {
    ...render(ui, { wrapper: AppProviders(history), ...options }),
    history,
  };
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
