import React, { FunctionComponent } from "react";
import "./GameController.css";

import { useVM } from "../../JavascriptVM/JavascriptVM";

const BUTTON_SPECIFICATION = {
  dpad: [
    {
      points:
        "22,38.528 18,38.528 18,34.528 12,34.528 12,38.528 8,38.528 8,44.528 12,44.528 12,48.528 18,48.528 18,44.528 22,44.528",
      key: null,
    },
    {
      points: "22,38.528 18,38.528 18,44.528 22,44.528",
      key: "right",
    },
    {
      points: "18,38.528 18,34.528 12,34.528 12,38.528",
      key: "up",
    },
    {
      points: "12,38.528 8,38.528 8,44.528 12,44.528",
      key: "left",
    },
    {
      points: "12,44.528 12,48.528 18,48.528 18,44.528",
      key: "down",
    },
  ],
  buttons: [
    {
      x: "33",
      y: "38.528",
      buttonName: "left",
      key: "A",
    },
    {
      x: "47",
      y: "38.528",
      buttonName: "right",
      key: "B",
    },
    {
      x: "40",
      y: "45.528",
      buttonName: "bottom",
      key: "X",
    },
    {
      x: "40",
      y: "31.528",
      buttonName: "top",
      key: "Y",
    },
  ],
};

/**
 * Component for the game controller
 */
export const GameController: FunctionComponent = () => {
  const vm = useVM();

  const onRelease = () => {
    handleMotorChange(0, 0);
  };

  const onButtonClicked = (event: React.MouseEvent) => {
    // forward
    handleMotorChange(0.5, 0.5);
  };

  const handleMotorChange = (leftPower: number, rightPower: number) => {
    vm.robot.setMotorPower(0, rightPower);
    vm.robot.setMotorPower(1, leftPower);
  };

  return (
    // original svg image is from https://www.svgrepo.com/svg/95376/game-controller LICENSE: CC0 License
    <svg
      version="1.1"
      id="GameController"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="200px"
      viewBox="0 27 57 30"
      enableBackground="0 0 57 57"
      xmlSpace="preserve"
    >
      <path
        fill="#CBD4D8"
        d="M45.241,55.471c-1.303,0.022-5.452-0.268-9.314-1.331c-4.514-1.242-10.121-1.237-14.637,0
	c-3.892,1.066-7.521,1.354-9.314,1.331C5.142,55.383,0,48.52,0,41.499v0c0-7.684,6.287-13.972,13.972-13.972h29.274
	C50.93,27.528,57,33.815,57,41.499v0C57,48.52,52.075,55.355,45.241,55.471z"
      />
      <line
        fill="none"
        stroke="#AFB6BB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="27"
        y1="31.528"
        x2="31.632"
        y2="31.528"
      />

      {BUTTON_SPECIFICATION.buttons.map(({ x, y, key, buttonName }) => (
        <svg key={key} viewBox="0 0 6 6" width="6" height="6" x={x} y={y}>
          <circle
            data-key={key}
            className={"gamepad-btn--" + buttonName}
            onMouseDown={onButtonClicked}
            onMouseUp={onRelease}
            cx="3"
            cy="3"
            r="3"
          />
          <text
            className="gamepad-button-text"
            x="50%"
            y="66%"
            text-anchor="middle"
            fill="white"
            font-size="4"
            font-family="courier"
          >
            {key}
          </text>
        </svg>
      ))}

      {BUTTON_SPECIFICATION.dpad.map(({ points, key }) => (
        <polygon
          className="gamepad-btn--dpad"
          data-key={key}
          onMouseDown={onButtonClicked}
          onMouseUp={onRelease}
          points={points}
        />
      ))}
    </svg>
  );
};
