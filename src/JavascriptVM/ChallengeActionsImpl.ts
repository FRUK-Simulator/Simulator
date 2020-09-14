import { ChallengeActions } from "../RobotSimulator/Areanas/base";
import { Sim3D, CoreSpecs } from "@fruk/simulator-core";
import { MessageType, messageSlice } from "../state/messagesSlice";

export class ChallengeActionsImpl implements ChallengeActions {
  constructor(private sim: Sim3D, private dispatch: (a: any) => void) {}

  addObject(
    o:
      | CoreSpecs.IBallSpec
      | CoreSpecs.IBoxSpec
      | CoreSpecs.IConeSpec
      | CoreSpecs.IZoneSpec
  ): void {
    switch (o.type) {
      case "ball":
        this.sim.addBall(o);
        break;
      case "box":
        this.sim.addBox(o);
        break;
      case "cone":
        this.sim.addCone(o);
        break;
      case "zone":
        this.sim.addZone(o);
        break;
    }
  }

  displayMessage(message: string, type: MessageType): void {
    this.dispatch(
      messageSlice.actions.addMessage({
        type,
        msg: message,
      })
    );
  }
}
