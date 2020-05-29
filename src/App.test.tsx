import React from "react";
import { render } from "./testUtils";
import { App } from "./App";

test("renders the simulator and blockly ui", () => {
  const { getByText } = render(<App />);

  expect(getByText("Blockly")).toBeInTheDocument();
  expect(getByText("Robot Simulator")).toBeInTheDocument();
});

test("navigating to an unknown URL shows a 404 page", () => {
  const { getByText, history } = render(<App />);

  history.push("/not_a_real_page");

  expect(getByText("404 - Page Not Found")).toBeInTheDocument();
});
