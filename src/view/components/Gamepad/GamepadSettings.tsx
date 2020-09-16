import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gameControllerSlice,
  isControllerVisible,
} from "../../../state/gameControllerSlice";
import { SelectField } from "../Common/Form";

const gamepadOptions = [
  {
    key: "hide",
    label: "Hide",
    value: false,
  },
  {
    key: "show",
    label: "Show",
    value: true,
  },
];

export const GamepadSettings = () => {
  const isVisible = useSelector(isControllerVisible);
  const dispatch = useDispatch();

  return (
    <SelectField
      label="Show Virtual Gamepad"
      options={gamepadOptions}
      selectedOption={gamepadOptions.find((s) => s.value === isVisible)}
      onChange={(opt) => {
        if (!opt) {
          return;
        }

        if (opt.value) {
          dispatch(gameControllerSlice.actions.showController());
        } else {
          dispatch(gameControllerSlice.actions.hideController());
        }
      }}
    />
  );
};
