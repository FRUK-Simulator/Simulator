import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the simulator and blockly ui", () => {
  const { getByText } = render(<App />);

  expect(getByText("Blockly")).toBeInTheDocument();
  expect(getByText("Robot Simulator")).toBeInTheDocument();
});
