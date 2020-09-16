import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import "./Gamepad.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ControllerKey,
  gameControllerSlice,
  isControllerVisible,
} from "../../../ControlPanel/GameController/gameControllerSlice";
import { AppDispatch } from "../../../state/store";

const BUTTON_SPECIFICATION = {
  dpad: [
    {
      points:
        "22,38.528 18,38.528 18,34.528 12,34.528 12,38.528 " +
        " 8,38.528 8,44.528 12,44.528 12,48.528 18,48.528 18,44.528 22,44.528",
      key: null,
    },
    {
      points: "22,38.528 18,38.528 18,44.528 22,44.528",
      key: ControllerKey.DpadRight,
    },
    {
      points: "18,38.528 18,34.528 12,34.528 12,38.528",
      key: ControllerKey.DpadUp,
    },
    {
      points: "12,38.528 8,38.528 8,44.528 12,44.528",
      key: ControllerKey.DpadLeft,
    },
    {
      points: "12,44.528 12,48.528 18,48.528 18,44.528",
      key: ControllerKey.DpadDown,
    },
  ],
  buttons: [
    {
      x: "33",
      y: "38.528",
      buttonName: "left",
      key: ControllerKey.X,
    },
    {
      x: "47",
      y: "38.528",
      buttonName: "right",
      key: ControllerKey.B,
    },
    {
      x: "40",
      y: "45.528",
      buttonName: "bottom",
      key: ControllerKey.A,
    },
    {
      x: "40",
      y: "31.528",
      buttonName: "top",
      key: ControllerKey.Y,
    },
  ],
};

// Ensures the value falls within the window with margins
function withinWindow(value: number, width: number) {
  const MIN_X = 0;
  const MAX_X = window.innerWidth - width;
  return Math.max(Math.min(value, MAX_X), MIN_X);
}
/**
 * Component for the game controller
 */
export const Gamepad: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [coordinates, setCoordinates] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const gamepadRef = useRef<HTMLElement | null>();
  const dragOffsetRef = useRef<{ x: number; y: number } | null>(null);
  const isVisible = useSelector(isControllerVisible);

  const onRelease = (key: ControllerKey | null) => {
    if (key) {
      dispatch(
        gameControllerSlice.actions.setControllerKeyState({ key, value: false })
      );
    }
  };

  const onButtonClicked = (key: ControllerKey | null) => {
    if (key) {
      dispatch(
        gameControllerSlice.actions.setControllerKeyState({ key, value: true })
      );
    }
  };

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      // Ensure the gamepad doesn't get hidden by shrinking the window
      setCoordinates({
        x: Math.min(coordinates.x, window.innerWidth - 40),
        y: Math.min(coordinates.y, window.innerHeight - 40),
      });
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  });

  return (
    // original svg image is from https://www.svgrepo.com/svg/95376/game-controller LICENSE: CC0 License
    <div
      className="gamepad"
      draggable
      onDragStart={(e) => {
        if (!gamepadRef.current) {
          return;
        }

        const gamePadRect = gamepadRef.current.getBoundingClientRect();
        dragOffsetRef.current = {
          x: e.clientX - gamePadRect.x,
          y: e.clientY - gamePadRect.y,
        };
      }}
      onDragEnd={(e) => {
        if (!gamepadRef.current || !dragOffsetRef.current) {
          return;
        }

        const startPos = dragOffsetRef.current || { x: 0, y: 0 };
        setCoordinates({
          x: withinWindow(
            e.clientX - startPos.x,
            gamepadRef.current!.getBoundingClientRect().width
          ),
          y: withinWindow(
            e.clientY - startPos.y,
            gamepadRef.current!.getBoundingClientRect().width
          ),
        });
      }}
      style={{
        top: coordinates.y,
        left: coordinates.x,
        visibility: isVisible ? "visible" : "hidden",
      }}
      ref={(e) => {
        gamepadRef.current = e;
      }}
    >
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
              className={"gamepad-btn gamepad-btn--" + buttonName}
              onMouseDown={(e) => {
                e.stopPropagation();
                onButtonClicked(key);
              }}
              onMouseUp={() => onRelease(key)}
              cx="3"
              cy="3"
              r="3"
            />
            <text
              className="gamepad-button-text"
              x="50%"
              y="66%"
              textAnchor="middle"
              fill="white"
              fontSize="4"
              fontFamily="courier"
            >
              {key}
            </text>
          </svg>
        ))}

        {BUTTON_SPECIFICATION.dpad.map(({ points, key }) => (
          <polygon
            key={key || "DEFAULT"}
            className="gamepad-btn gamepad-btn--dpad"
            onMouseDown={() => onButtonClicked(key)}
            onMouseUp={() => onRelease(key)}
            points={points}
          />
        ))}
      </svg>
    </div>
  );
};
