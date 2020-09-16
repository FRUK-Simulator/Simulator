import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gameControllerSlice,
  isControllerVisible,
} from "../../../ControlPanel/GameController/gameControllerSlice";
import { Button, ButtonVariant } from "../Common/Button";
import { IconName } from "../Common/Icon";

export const ShowGamepadButton = () => {
  const isVisible = useSelector(isControllerVisible);
  const dispatch = useDispatch();
  return (
    <Button
      variant={ButtonVariant.info}
      iconName={IconName.controller}
      onClick={() => {
        if (isVisible) {
          dispatch(gameControllerSlice.actions.hideController());
        } else {
          dispatch(gameControllerSlice.actions.showController());
        }
      }}
    >
      {isVisible ? "Hide" : "Show"} Controller
    </Button>
  );
};
