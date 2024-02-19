import React from "react";
import { createRoot } from "react-dom/client";
import { AppWithProviders } from "./App";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>,
);
