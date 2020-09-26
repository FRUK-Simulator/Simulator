import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadSettings, persistSettings } from "../../core/settings/settings";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import { ExecutionSpeed } from "../../JavascriptVM/vm";
import { getExecutionSpeed } from "../../JavascriptVM/vmSlice";
import { Container } from "../components/Common/Container";
import { SelectField } from "../components/Common/Form";
import { Title } from "../components/Common/Title";
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

  // load settings initially
  useEffect(() => {
    const settings = loadSettings();

    vm.updateSpeed(settings.simulatorSpeed);
  }, [vm]);

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
        persistSettings({ simulatorSpeed: opt.value });
      }}
    />
  );
};

export const SettingsView = () => {
  return (
    <Container className="simulator-view--panel__main">
      <Title as="h2" divider>
        Settings
      </Title>
      <ExecutionSpeedSelect />
      <GamepadSettings />
    </Container>
  );
};
