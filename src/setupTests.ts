// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Sets up a virtual canvas for blockly
import "jest-canvas-mock";

// Sets up fluent ui icons
import { initializeIcons } from "@uifabric/icons";
initializeIcons();

import { initBlockly } from "./BlocklyInterface/BlocklyInstance";
initBlockly();

// Simulator does not render and is outside of the scope of unit / integration tests.
jest.mock("@fruk/simulator-core", () => {
  return {
    Sim3D: jest.fn(() => ({
      beginRendering: jest.fn(),
      stopRendering: jest.fn(),
      onresize: jest.fn(),
    })),
  };
});

// Blockly issues warnings about not being able to find i18n messages and spews
// in the console blocking testing output - this filters those out.
const logFn = console.log.bind(console);
console.log = (msg: any, ...rest: any[]) => {
  if (
    msg &&
    typeof msg === "string" &&
    msg.includes("WARNING: No message string for")
  ) {
    return;
  }

  logFn(msg, ...rest);
};
