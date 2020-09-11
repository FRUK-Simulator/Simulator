import { FunctionComponent } from "react";
import React from "react";
import "./Icon.css";

export enum IconName {
  start = "fas fa-check",
  step = "fas fa-forward",
  stop = "fas fa-stop",
  run = "fas fa-play",
  view = "fas fa-eye",
  save = "fas fa-save",
  exit = "fas fa-times",
}

export const Icon: FunctionComponent<{ iconName: IconName }> = ({
  iconName,
}) => {
  return <i className={iconName}></i>;
};
