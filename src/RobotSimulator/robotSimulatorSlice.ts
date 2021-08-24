import {
  BasicSensorSpec,
  ComplexSensorSpec,
  IRobotSpec,
  SensorMountingFace,
} from "@fruk/simulator-core/dist/engine/specs/RobotSpecs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";

interface Sensor {
  channel: number;
  mountFaceName: string;
}

export interface Sensors {
  distanceSensors: Sensor[];
  contactSensors: Sensor[];
  gyroscopeSensors: Sensor[];
  colorSensors: Sensor[];
}

interface IRobotSimulatorState {
  motors: {
    [channel: number]: number;
  };
  sensors: Sensors;
}

/**
 * Reducers for handling the state of the simulator such as whether it is executing or not.
 */
export const robotSimulatorSlice = createSlice({
  initialState: {
    motors: {},
    sensors: {
      distanceSensors: [],
      contactSensors: [],
      gyroscopeSensors: [],
      colorSensors: [],
    },
  } as IRobotSimulatorState,
  name: "simulator",
  reducers: {
    setPower(state, action: PayloadAction<{ channel: number; power: number }>) {
      state.motors[action.payload.channel] = action.payload.power;

      return state;
    },
    setRobotSpec(state, action: PayloadAction<{ spec: Sensors }>) {
      state.sensors = action.payload.spec;
    },
  },
});

export const getMotorPower = (channel: number) => (state: RootState) =>
  state.simulator.motors[channel] || 0;

export const getMotorStats = (state: RootState) =>
  Object.entries(state.simulator.motors);

export const getSensors = (state: RootState) => state.simulator.sensors;

export function specToSensors(spec: IRobotSpec): Sensors {
  let isDist = (x: BasicSensorSpec) => x.type === "distance-sensor";
  let isContact = (x: BasicSensorSpec) => x.type === "contact-sensor";
  let isGyro = (x: BasicSensorSpec) => x.type === "gyroscope-sensor";
  let isColor = (x: ComplexSensorSpec) => x.type === "color-sensor";

  let convertToObj = (x: BasicSensorSpec | ComplexSensorSpec) => {
    return {
      channel: x.channel,
      mountFaceName: `${SensorMountingFace[x.mountFace]}`,
    };
  };

  return {
    distanceSensors: spec.basicSensors?.filter(isDist).map(convertToObj) || [],
    contactSensors:
      spec.basicSensors?.filter(isContact).map(convertToObj) || [],
    gyroscopeSensors: spec.basicSensors?.filter(isGyro).map(convertToObj) || [],
    colorSensors: spec.complexSensors?.filter(isColor).map(convertToObj) || [],
  };
}
