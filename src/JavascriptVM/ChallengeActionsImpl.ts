import { ChallengeActions } from "../RobotSimulator/Arenas/base";
import { Sim3D, CoreSpecs } from "@fruk/simulator-core";
import { MessageType, messageSlice } from "../state/messagesSlice";
import { v4 as uuidv4 } from "uuid";
import {
  challengeSlice,
  ChallengeStatus,
} from "../RobotSimulator/Arenas/challengeSlice";

export class ChallengeActionsImpl implements ChallengeActions {
  constructor(
    private sim: Sim3D,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private dispatch: (a: any) => void,
    private challengeId: string,
    private terminateCallback: () => void,
  ) {}

  addObject(
    o:
      | CoreSpecs.IBallSpec
      | CoreSpecs.IBoxSpec
      | CoreSpecs.IConeSpec
      | CoreSpecs.IZoneSpec,
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
      }),
    );
  }

  displayFadingMessage(
    message: string,
    type: MessageType,
    timeout?: number,
  ): void {
    const msgId = uuidv4();
    if (!timeout) {
      timeout = 2000;
    }

    this.dispatch(
      messageSlice.actions.addMessage({
        type,
        msg: message,
        id: msgId,
      }),
    );

    setTimeout(() => {
      this.dispatch(
        messageSlice.actions.removeMessage({
          id: msgId,
        }),
      );
    }, timeout);
  }

  clearAllMessages() {
    this.dispatch(messageSlice.actions.clearAllMesages());
  }

  setChallengeStatus(status: ChallengeStatus): void {
    this.dispatch(
      challengeSlice.actions.setChallengeStatus({
        status: status,
        id: this.challengeId,
      }),
    );
  }
  terminateChallenge(): void {
    this.terminateCallback();
  }
}
