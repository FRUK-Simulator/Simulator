import { DcMotorWithEncoder } from "./DcMotorWithEncoder.js";

interface ControlHubListener {
	onSetDcMotorDirection(dcMotorPort: number, forward: boolean): void;
	onSetDcMotorPower(dcMotorPort: number, power: number): void;
}

export { ControlHubListener }
