import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSettings, persistSettings } from "../../../core/settings/settings";
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

  useEffect(() => {
    const settings = loadSettings();
    if (settings.showController) {
      dispatch(gameControllerSlice.actions.showController());
    } else {
      dispatch(gameControllerSlice.actions.hideController());
    }
  }, [dispatch]);

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

        persistSettings({ showController: opt.value });
      }}
    />
  );
};
