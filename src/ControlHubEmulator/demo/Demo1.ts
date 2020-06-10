import { ControlHubEmulator } from "../core/ControlHubEmulator.js";
import { Demo1ControlHubListener } from "./Demo1ControlHubListener.js";

let hubLogElement: HTMLElement = <HTMLElement>document.getElementById("hubLog");
let controlHubEmulator: ControlHubEmulator = new ControlHubEmulator();
let listener: Demo1ControlHubListener = new Demo1ControlHubListener(hubLogElement, document);
controlHubEmulator.addListener(listener);

// demo data: fire first command
controlHubEmulator.setDcMotorPower(1, 0.5);
// wait two seconds and fire next command
setTimeout(function () {
    controlHubEmulator.setDcMotorPower(2, 0.7);
}, 2000);
