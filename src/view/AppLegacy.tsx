import "./variables.css";
import "./index.css";
import "./utils.css";

import { FC } from "react";
import { AppRouterLegacy } from "../view/AppRouterLegacy";
import { Header } from "./components/Header/Header";
import { MessageCenter } from "./components/MessageCenter/MessageCenter";

const AppLegacy: FC = () => {
  return (
    <div className="app-container">
      <Header />
      <MessageCenter />
      <AppRouterLegacy />
    </div>
  );
};

export default AppLegacy;
