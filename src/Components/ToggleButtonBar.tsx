import { FunctionComponent } from "react";
import React from "react";
import { PrimaryButton, ActionButton } from "@fluentui/react";

/**
 * Displays a bar of buttons that can be toggled.
 *
 * @param props.activeButton the index of the active button
 */
export const ToggleButtonBar: FunctionComponent<{
  buttons: Array<{
    label: string;
    onClick: () => void;
  }>;
  activeButton: number;
}> = ({ buttons, activeButton }) => {
  return (
    <div>
      {buttons.map(({ label, onClick }, indx) =>
        activeButton === indx ? (
          <PrimaryButton text={label} key={label} />
        ) : (
          <ActionButton text={label} onClick={onClick} key={label} />
        )
      )}
    </div>
  );
};
