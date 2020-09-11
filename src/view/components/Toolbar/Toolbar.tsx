import React from "react";
import { LinkButton, ButtonVariant } from "../Common/Button";
import "./Toolbar.css";

export const Toolbar = () => (
  <div className="toolbar">
    <LinkButton to="?view=code" variant={ButtonVariant.success}>
      Code
    </LinkButton>
    <LinkButton to="?view=programs" variant={ButtonVariant.success}>
      My Programs
    </LinkButton>
    <LinkButton to="?view=robot" variant={ButtonVariant.success}>
      Robot
    </LinkButton>
    <LinkButton to="?view=settings" variant={ButtonVariant.success}>
      Settings
    </LinkButton>
  </div>
);
