import { ControlHubListener } from "../core/ControlHubListener.js";

class Demo1ControlHubListener implements ControlHubListener {
    private hubLogElement: HTMLElement;
    private document: Document;

    public constructor(hubLogElement: HTMLElement, document: Document) {
        this.hubLogElement = hubLogElement;
        this.document = document;
    }

    public onSetDcMotorDirection(dcMotorPort: number, forward: boolean): void {

    }

    public onSetDcMotorPower(dcMotorPort: number, power: number): void {
        const p = this.document.createElement("p");
        p.textContent = "onSetDcMotorPower";
        this.hubLogElement?.appendChild(p);
    }
}

export { Demo1ControlHubListener }