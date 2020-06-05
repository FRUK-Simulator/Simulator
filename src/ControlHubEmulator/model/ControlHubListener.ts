import { DcMotorWithEncoder } from "./DcMotorWithEncoder";

interface ControlHubListener {
	onSetDcMotorDirection(dcMotorPort: number, forward: boolean): void;
	onSetDcMotorPower(dcMotorPort: number, power: number): void;
}

export { ControlHubListener }
