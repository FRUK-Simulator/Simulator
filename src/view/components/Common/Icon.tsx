import { FunctionComponent } from "react";
import React from "react";
import "./Icon.css";

export enum IconName {
  start = "fas fa-play",
  pause = "fas fa-pause",
  step = "fas fa-forward",
  stop = "fas fa-stop",
  run = "fas fa-play",
  view = "fas fa-eye",
  save = "fas fa-save",
  exit = "fas fa-times",
  file = "far fa-file",
  load = "fas fa-external-link-alt",
  download = "fas fa-file-download",
  controller = "fas fa-gamepad",
  back = "fas fa-arrow-left",
  import = "fas fa-file-upload",
}

export const Icon: FunctionComponent<
  { iconName: IconName } & React.HtmlHTMLAttributes<HTMLElement>
> = ({ iconName, ...rest }) => {
  return <i {...rest} className={`${iconName} ${rest.className}`.trim()}></i>;
};
