import {
  ArenaConfig,
  ChallengeConfig,
  ChallengeListener,
  ChallengeActions,
  ChallengeEvent,
} from "./base";
import { CoreSimTypes } from "@fruk/simulator-core";
import { MessageType } from "../../state/messagesSlice";

export const arenas = [arena];
export const challenges = [challengeA, challengeB];

function arena(): ArenaConfig {
  const height: number = 0.4;
  const thickness: number = 0.1;
  const arenaConfig: ArenaConfig = {
    name: "Parking Lot",
    worldConfig: {
      zLength: 5,
      xLength: 5,
      walls: [],
      perimeter: {
        height: 0.5,
        thickness: 0.2,
      },
      camera: {
        position: {
          x: 0,
          y: 3,
          z: 3,
        },
      },
    },
    boxSpecs: [
      {
        type: "box",
        dimensions: { x: thickness, y: height, z: 1 },
        initialPosition: { x: 2, y: -2 },
      },
      {
        type: "box",
        dimensions: { x: thickness, y: height, z: 1 },
        initialPosition: { x: 1, y: -2 },
      },
      {
        type: "box",
        dimensions: { x: 1, y: height, z: thickness },
        initialPosition: { x: -2, y: -2 },
      },
      {
        type: "box",
        dimensions: { x: 1, y: height, z: thickness },
        initialPosition: { x: -2, y: -1 },
      },
    ],
  };

  return arenaConfig;
}

function challengeA(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Parking Lot Challenge 1",
    startPosition: { x: -2, y: 2 },
    arenaConfig: arena(),
    eventListener: new ParkingLotChallenge({ x: 1.5, y: -2 }),
  };

  return challengeConfig;
}

function challengeB(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Parking Lot Challenge 2",
    startPosition: { x: 2, y: 2 },
    arenaConfig: arena(),
    eventListener: new ParkingLotChallenge({ x: -2, y: -1.5 }),
  };

  return challengeConfig;
}

const FinishZoneId = "finish-zone";

class ParkingLotChallenge implements ChallengeListener {
  constructor(public finishPosition: CoreSimTypes.Vector2d) {}
  actions?: ChallengeActions;

  onStart(actions: ChallengeActions) {
    this.actions = actions;
    actions.addObject({
      type: "zone",
      initialPosition: this.finishPosition,
      zoneId: FinishZoneId,
      zoneShape: {
        type: "rectangle",
        zLength: 0.8,
        xLength: 0.8,
      },
      baseColor: 0x00ff00,
    });
  }

  onStop() {
    this.actions = undefined;
  }

  onEvent(e: ChallengeEvent) {
    if (e.kind === "ZoneEvent") {
      if (e.zoneId === FinishZoneId) {
        this.actions?.displayMessage("Robot Wins!", MessageType.success);
      }
    }
  }
}
