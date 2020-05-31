import React, { Component } from "react";
import "./RobotSimulator.css";
import { Sim3D } from "./Sim3D";

// This component coordinates between react html and the canvas. It uses the 3DSim class to handle the 3D scene and
// proxies all required events from the browsers into the simulation. All react redux integration is done at this level.
export class RobotSimulator extends Component {
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private canvasParentRef = React.createRef<HTMLDivElement>();

  private onresizeCb = this.onresize.bind(this);

  private sim: Sim3D | null = null;
  private isRendering = false;

  componentDidMount() {
    this.onresize();

    window.addEventListener("resize", this.onresizeCb);
    const canvasEl = this.canvasRef.current!;

    this.sim = new Sim3D(canvasEl);

    this.isRendering = true;
    this.triggerRender();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onresizeCb);

    this.isRendering = false;
    this.sim = null;
  }

  onresize() {
    const canvasEl = this.canvasRef.current!;
    const canvasParentEl = this.canvasParentRef.current!;

    canvasEl.width = canvasParentEl.clientWidth;
    canvasEl.height = canvasParentEl.clientHeight;

    if (this.sim) {
      this.sim.onresize();
    }
  }

  triggerRender() {
    if (!this.isRendering) {
      return;
    }

    requestAnimationFrame(this.triggerRender.bind(this));

    if (this.sim) {
      this.sim.render();
    }
  }

  render() {
    return (
      <div className="robot-simulator" ref={this.canvasParentRef}>
        <canvas className="simulator" ref={this.canvasRef}>
          Canvas is not supported in your browser, try another
        </canvas>
      </div>
    );
  }
}
