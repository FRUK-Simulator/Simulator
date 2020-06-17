import { DcMotorWithEncoder } from "./DcMotorWithEncoder";

export interface ControlHubListener {
  onSetDcMotorPower(port: number, power: number): void;
}
