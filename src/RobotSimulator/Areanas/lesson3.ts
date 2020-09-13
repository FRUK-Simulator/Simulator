import {
  ArenaConfig,
  ChallengeConfig,
  ChallengeListener,
  ChallengeActions,
  ChallengeEvent,
} from "./base";
import { CoreSpecs } from "@fruk/simulator-core";
import { MessageType } from "../../state/messagesSlice";

export const arenas = [arena];
export const challenges = [challengeA, challengeB];

function arena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 3",
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

const FinishZoneId = "finish-zone";

function challengeA(): ChallengeConfig {
  const badZones: CoreSpecs.IZoneSpec[] = [];
  const finishZone: CoreSpecs.IZoneSpec = {
    type: "zone",
    initialPosition: { x: 0, y: -1 },
    zoneId: FinishZoneId,
    zoneShape: {
      type: "rectangle",
      xLength: 1,
      zLength: 1,
    },
    baseColor: 0xff0000,
  };
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 3 - Challenge A",
    startPosition: { x: 0, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson3Challenge(finishZone, badZones),
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
        xLength: 3,
        zLength: 3,
      },
      baseColor: 0x000000,
      zoneId: "0",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: -2 },
      zoneShape: {
        type: "rectangle",
        xLength: 5,
        zLength: 1,
      },
      baseColor: 0x000000,
      zoneId: "1",
    },
  ];
  const finishZone: CoreSpecs.IZoneSpec = {
    type: "zone",
    initialPosition: { x: 2, y: 2 },
    zoneId: FinishZoneId,
    zoneShape: {
      type: "rectangle",
      xLength: 1,
      zLength: 1,
    },
    baseColor: 0xff0000,
  };
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 3 - Challenge B",
    startPosition: { x: -2, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson3Challenge(finishZone, badZones),
  };

  return challengeConfig;
}

class Lesson3Challenge implements ChallengeListener {
  constructor(
    public finishZone: CoreSpecs.IZoneSpec,
    public badZones: CoreSpecs.IZoneSpec[]
  ) {}
  actions?: ChallengeActions;
  timeoutId?: NodeJS.Timeout;

  onStart(actions: ChallengeActions) {
    this.actions = actions;
    actions.addObject(this.finishZone);
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
        if (e.entry) {
          this.timeoutId = setTimeout(this.markComplete, 5000);
          this.actions?.displayMessage(
            "Stay in the zone for 5 seconds",
            MessageType.info
          );
        } else if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
      } else if (e.zoneId.startsWith("bad-")) {
        this.actions?.displayMessage("Robot Looses!", MessageType.danger);
      }
    }
  }

  markComplete(): void {
    console.log("timeout now");
    this.actions?.displayMessage("Robot Wins!", MessageType.success);
  }
}
