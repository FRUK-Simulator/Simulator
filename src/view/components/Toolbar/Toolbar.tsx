import React from "react";
import { LinkButton } from "../Common/Button";
import "./Toolbar.css";

export const Toolbar = () => (
  <div className="toolbar">
    <LinkButton to="?view=code">Code</LinkButton>
    <LinkButton to="?view=programs">My Programs</LinkButton>
    <LinkButton to="?view=robot">Robot</LinkButton>
    <LinkButton to="?view=settings">Settings</LinkButton>
  </div>
);
