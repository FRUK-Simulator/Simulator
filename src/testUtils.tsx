/**
 * This file provides useful utilities and functions to ease testing. See https://testing-library.com/docs/react-testing-library/setup for
 * more info.
 */

import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { createMemoryHistory, History } from "history";
import { VMProvider } from "./JavascriptVM/JavascriptVM";

const AppProviders =
  (history: History) =>
  ({ children }: { children: any }) => {
    return (
      <Provider store={store}>
        <VMProvider>
          <Router history={history}>{children}</Router>
        </VMProvider>
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
