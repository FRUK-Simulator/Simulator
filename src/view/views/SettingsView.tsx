import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSettings, persistSettings } from "../../core/settings/settings";
import { useVM } from "../../JavascriptVM/JavascriptVM";
import { ExecutionSpeed, CameraView } from "../../JavascriptVM/vm";
import {
  getCameraMode,
  getExecutionSpeed,
  vmSlice,
} from "../../JavascriptVM/vmSlice";
import { AppDispatch } from "../../state/store";
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

const cameraViewOptions = [
  {
    key: "position",
    label: "Top down",
    value: CameraView.POSITION,
  },
  {
    key: "third_person",
    label: "Follow the robot",
    value: CameraView.THIRD_PERSON,
  },
  {
    key: "orbit",
    label: "Orbit",
    value: CameraView.ORBIT,
  },
];

const physicsDebugOptions = [
  {
    key: "on",
    label: "Tick",
    value: true,
  },
  {
    key: "off",
    label: "Cross",
    value: false,
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
        (s) => s.value === executionSpeed,
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

const CameraViewSelect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cameraMode = useSelector(getCameraMode);

  return (
    <SelectField
      label="Camera Mode"
      options={cameraViewOptions}
      selectedOption={cameraViewOptions.find((s) => s.value === cameraMode)}
      onChange={(opt) => {
        if (!opt) {
          return;
        }

        dispatch(vmSlice.actions.setCameraView({ val: opt.value }));
        persistSettings({ cameraView: opt.value });
      }}
    />
  );
};

const PhysicsDebugSelect = () => {
  const vm = useVM();
  const [physicsDebug, setPhysicsDebug] = useState(vm.isDebugMode());

  return (
    <SelectField
      label="Physics Debug"
      options={physicsDebugOptions}
      selectedOption={physicsDebugOptions.find((s) => s.value === physicsDebug)}
      onChange={(opt) => {
        if (!opt) {
          return;
        }

        vm.setDebugMode(opt.value);
        setPhysicsDebug(opt.value);
      }}
    />
  );
};

export const SettingsView = () => {
  return (
    <Container className="simulator-view--panel__main">
      <ExecutionSpeedSelect />
      <GamepadSettings />
      <CameraViewSelect />
      <PhysicsDebugSelect />
    </Container>
  );
};
