import { DcMotorWithEncoder } from "./DcMotorWithEncoder";
import { ControlHubListener } from "./ControlHubListener";

const NUMBER_OF_DC_MOTORS_WITH_ENCODER = 4;

/**
 * This class emulates the inputs and outputs of the physical ControlHub
 */
class ControlHubEmulator {
    dcMotorWithEncoder: Array<DcMotorWithEncoder> = [];
    controlHubListeners: Array<ControlHubListener> = [];

    constructor() {
        this.createDcMotorsWithEncoder(NUMBER_OF_DC_MOTORS_WITH_ENCODER);
    }

    private createDcMotorsWithEncoder(numberOfDcMotorsWithEncoder: number): void {
        for (let i = 0; i < numberOfDcMotorsWithEncoder; i++) {
            this.dcMotorWithEncoder[i] = new DcMotorWithEncoder();
        }
    }

    public addListener(controlHubListener: ControlHubListener): void {
        this.controlHubListeners.push(controlHubListener);
    }

    /**
     * Sets the direction in which the motor should run
     * @param dcMotorPort the port where the motor is plugged into the ControlHub (0, 1, ...)
     * @param forward true for driving forward, false for backward
     */
    public setDcMotorDirection(dcMotorPort: number, forward: boolean): void {
        for (let controlHubListener of this.controlHubListeners) {
            controlHubListener.onSetDcMotorDirection(dcMotorPort, forward);
        }
    }

    /**
     * Sets how fast the motor should run
     * @param dcMotorPort the port where the motor is plugged into the ControlHub (0, 1, ...)
     * @param power a value between 0 and 1. 0=stop, 1=full power, 0.5=50% power.
     */
    public setDcMotorPower(dcMotorPort: number, power: number): void {
        for (let controlHubListener of this.controlHubListeners) {
            controlHubListener.onSetDcMotorPower(dcMotorPort, power);
        }
    }
}