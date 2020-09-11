import React from "react";
import { Button } from "../Common/Button";
import "./Toolbar.css";
import { Link } from "react-router-dom";

export const Toolbar = () => (
  <div className="toolbar">
    <Button to="?view=code">Code</Button>
    <Button to="?view=programs">My Programs</Button>
    <Button to="?view=robot">Robot</Button>
    <Button to="?view=settings">Settings</Button>
  </div>
);
