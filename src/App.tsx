import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppRouter } from "./AppRouter";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
