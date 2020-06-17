import { ControlHubConfig } from "./ControlHubConfig";
import { DcMotorWithEncoder } from "./DcMotorWithEncoder";
import { ControlHubListener } from "./ControlHubListener";

/**
 * This class emulates the inputs and outputs of the physical ControlHub
 */
export class ControlHubEmulator {
  private dcMotorWithEncoder: Array<DcMotorWithEncoder> = [];
  private controlHubListeners: Array<ControlHubListener> = [];
  private config: ControlHubConfig;

  constructor(config: ControlHubConfig) {
    this.config = config;
    this.createDcMotorsWithEncoder();
  }

  private createDcMotorsWithEncoder(): void {
    for (let i = 0; i < this.config.ports.numberOfDcMotors; i++) {
      this.dcMotorWithEncoder.push(new DcMotorWithEncoder());
    }
  }

  public addListener(controlHubListener: ControlHubListener): void {
    this.controlHubListeners.push(controlHubListener);
  }

  /**
   * Sets how fast the motor should run
   * @param port the DC motor port where the motor is plugged into the ControlHub (0, 1, ...)
   * @param power a value between -1 and 1. 0=stop, 1=full power forward, -1=full power backward, 0.5=50% power forward.
   */
  public setDcMotorPower(port: number, power: number): void {
    this.dcMotorWithEncoder[port].power = power;
    for (let controlHubListener of this.controlHubListeners) {
      controlHubListener.onSetDcMotorPower(port, power);
    }
  }

  public getDcMotorPower(port: number): number {
    return this.dcMotorWithEncoder[port].power;
  }

  /**
   * Returns wether a digital input port is high or low
   * @param port
   */
  public isDigitalInHigh(port: number): boolean {
    // TODO fake implementation 7 seconds low and then 3 seconds high
    return (new Date().getTime() / 10) % 10 > 6;
  }
}
