import {
  ArenaConfig,
  ChallengeConfig,
  ChallengeListener,
  ChallengeActions,
  ChallengeEvent,
} from "./base";
import { Vector2d } from "@fruk/simulator-core/dist/engine/SimTypes";
import { IZoneSpec } from "@fruk/simulator-core/dist/engine/specs/CoreSpecs";

export const arenas = [arena];
export const challenges = [challengeA, challengeB];

function arena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 1",
    worldConfig: {
      zLength: 20,
      xLength: 20,
      walls: [],
      camera: {
        position: {
          x: 0,
          y: 10,
          z: 10,
        },
      },
    },
  };

  return arenaConfig;
}

function challengeA(): ChallengeConfig {
  const badZones: IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: -3, y: 0 },
      zoneShape: {
        type: "rectangle",
        xLength: 2,
        zLength: 20,
      },
      baseColor: 0x000000,
      zoneId: "0",
    },
    {
      type: "zone",
      initialPosition: { x: 3, y: 0 },
      zoneShape: {
        type: "rectangle",
        xLength: 2,
        zLength: 20,
      },
      baseColor: 0x000000,
      zoneId: "1",
    },
  ];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge A",
    startPosition: { x: 0, y: 6 },
    arenaConfig: arena(),
    eventListener: new Lesson1Challenge({ x: 0, y: -8 }, badZones),
  };

  return challengeConfig;
}

function challengeB(): ChallengeConfig {
  const badZones: IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: 0, y: 5 },
      zoneShape: {
        type: "rectangle",
        xLength: 4,
        zLength: 10,
      },
      baseColor: 0x000000,
      zoneId: "0",
    },
  ];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge B",
    startPosition: { x: -8, y: 6 },
    arenaConfig: arena(),
    eventListener: new Lesson1Challenge({ x: +8, y: 8 }, badZones),
  };

  return challengeConfig;
}

const FinishZoneId = "finish-zone";

class Lesson1Challenge implements ChallengeListener {
  constructor(public finishPosition: Vector2d, public badZones: IZoneSpec[]) {}
  actions?: ChallengeActions;

  onStart(actions: ChallengeActions) {
    this.actions = actions;
    actions.addObject({
      type: "zone",
      initialPosition: this.finishPosition,
      zoneId: FinishZoneId,
      zoneShape: {
        type: "rectangle",
        zLength: 2,
        xLength: 2,
      },
      baseColor: 0x00ff00,
    });
    this.badZones.forEach((z) => {
      z.zoneId = "bad-" + z.zoneId;
      actions.addObject(z);
    });
  }

  onStop() {
    this.actions = undefined;
  }

  onEvent(e: ChallengeEvent) {
    if (e.kind === "ZoneEvent") {
      if (e.zoneId === FinishZoneId) {
        this.actions?.displayMessage("Robot Wins!");
      } else if (e.zoneId.startsWith("bad-")) {
        this.actions?.displayMessage("Robot Looses!");
      }
    }
  }
}
