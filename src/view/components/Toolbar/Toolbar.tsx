import React from "react";
import { LinkButton, ButtonVariant } from "../Common/Button";
import "./Toolbar.css";

export const Toolbar = () => (
  <div className="toolbar-container">
    <div className="toolbar">
      <LinkButton
        to="?view=code"
        variant={ButtonVariant.success}
        replace={true}
      >
        Code
      </LinkButton>
      <LinkButton
        to="?view=programs"
        variant={ButtonVariant.success}
        replace={true}
      >
        My Programs
      </LinkButton>
      <LinkButton
        to="?view=robot"
        variant={ButtonVariant.success}
        replace={true}
      >
        Robot
      </LinkButton>
      <LinkButton
        to="?view=settings"
        variant={ButtonVariant.success}
        replace={true}
      >
        Settings
      </LinkButton>
    </div>
  </div>
);
