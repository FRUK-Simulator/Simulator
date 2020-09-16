import React from "react";
import { useSelector } from "react-redux";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import { ExecutionSpeed } from "../../JavascriptVM/vm";
import { getExecutionSpeed } from "../../JavascriptVM/vmSlice";
import { Container } from "../components/Common/Container";
import { SelectField } from "../components/Common/Form";
import { GamepadSettings } from "../components/Gamepad/GamepadSettings";

const executionSpeedOptions = [
  {
    key: "slow",
    label: "Turtle",
    value: ExecutionSpeed.SLOW,
  },
  {
    key: "fast",
    label: "Rabbit",
    value: ExecutionSpeed.FAST,
  },
];

const ExecutionSpeedSelect = () => {
  const vm = useVM();
  const executionSpeed = useSelector(getExecutionSpeed);

  return (
    <SelectField
      label="Code Speed"
      options={executionSpeedOptions}
      selectedOption={executionSpeedOptions.find(
        (s) => s.value === executionSpeed
      )}
      onChange={(opt) => {
        if (!opt) {
          return;
        }

        vm.updateSpeed(opt.value);
      }}
    />
  );
};

export const SettingsView = () => {
  return (
    <Container>
      <h2>Settings</h2>
      <ExecutionSpeedSelect />
      <GamepadSettings />
    </Container>
  );
};
