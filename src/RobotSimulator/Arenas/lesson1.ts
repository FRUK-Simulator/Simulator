import {
  ArenaConfig,
  ChallengeConfig,
  ChallengeListener,
  ChallengeActions,
  ChallengeEvent,
} from "./base";
import { MessageType } from "../../state/messagesSlice";
import { CoreSimTypes } from "@fruk/simulator-core";
import { CoreSpecs } from "@fruk/simulator-core";

export const arenas = [arena];
export const challenges = [challengeA, challengeB, challengeC];

function arena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 1",
    worldConfig: {
      zLength: 5,
      xLength: 5,
      walls: [],
      perimeter: {
        height: 0.5,
        thickness: 0.1,
      },
      camera: {
        position: {
          x: 0,
          y: 3,
          z: 3,
        },
      },
    },
  };

  return arenaConfig;
}

function challengeA(): ChallengeConfig {
  const badZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: -1.2, y: 0 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.5,
        zLength: 5,
      },
      baseColor: 0x000000,
      zoneId: "0",
    },
    {
      type: "zone",
      initialPosition: { x: 1.2, y: 0 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.5,
        zLength: 5,
      },
      baseColor: 0x000000,
      zoneId: "1",
    },
  ];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge A",
    startPosition: { x: 0, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson1Challenge({ x: 0, y: -2 }, badZones),
  };

  return challengeConfig;
}

function challengeB(): ChallengeConfig {
  const badZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: 0, y: 1 },
      zoneShape: {
        type: "rectangle",
        xLength: 1,
        zLength: 3,
      },
      baseColor: 0x000000,
      zoneId: "0",
    },
  ];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge B",
    startPosition: { x: -2, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson1Challenge({ x: +2, y: 2 }, badZones),
  };

  return challengeConfig;
}

function challengeC(): ChallengeConfig {
  const badZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: -1.4, y: 0.5 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.2,
        zLength: 4,
      },
      baseColor: 0x000000,
      zoneId: "0",
    },
    {
      type: "zone",
      initialPosition: { x: 1.4, y: 0.5 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.2,
        zLength: 4,
      },
      baseColor: 0x000000,
      zoneId: "1",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: -0.5 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.4,
        zLength: 4,
      },
      baseColor: 0x000000,
      zoneId: "2",
    },
  ];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge C",
    startPosition: { x: -2, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson1Challenge({ x: 2, y: 2 }, badZones),
  };

  return challengeConfig;
}

const FinishZoneId = "finish-zone";

class Lesson1Challenge implements ChallengeListener {
  constructor(
    public finishPosition: CoreSimTypes.Vector2d,
    public badZones: CoreSpecs.IZoneSpec[]
  ) {}
  actions?: ChallengeActions;

  onStart(actions: ChallengeActions) {
    this.actions = actions;
    actions.addObject({
      type: "zone",
      initialPosition: this.finishPosition,
      zoneId: FinishZoneId,
      zoneShape: {
        type: "rectangle",
        zLength: 1,
        xLength: 1,
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
        this.actions?.displayMessage("Robot Wins!", MessageType.success);
      } else if (e.zoneId.startsWith("bad-")) {
        this.actions?.displayMessage("Robot Looses!", MessageType.danger);
      }
    }
  }
}
