import {
  ArenaConfig,
  ChallengeConfig,
  ChallengeListener,
  ChallengeActions,
  ChallengeEvent,
} from "./base";
import { CoreSpecs } from "@fruk/simulator-core";
import { MessageType } from "../../state/messagesSlice";
import { ChallengeStatus } from "./challengeSlice";

export const arenas = [arena];
export const challenges = [challengeA, challengeB, challengeC];

function arena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 2 - Distance Sensor",
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
    name: "Lesson 2 - Challenge A",
    startPosition: { x: 0, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson2Challenge(finishZone, badZones),
    descriptions: {
      short: "Reading the distance sensor",
      markdown: `
# Lesson 2 - Challenge A

The robot must be driven into the red zone, and then stop in it.
Stay in the zone for five seconds to complete the challenge.

If the robot leaves the red zone before the five seconds is up then you will fail the challenge.
      `,
    },
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
    name: "Lesson 2 - Challenge B",
    startPosition: { x: -2, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson2Challenge(finishZone, badZones),
    descriptions: {
      short: "Combining distance and turning",
      markdown: `
# Lesson 2 - Challenge B

Use the distance sensor to follow the path to the red zone.

Stay in the zone for five seconds to complete the challenge.

If the robot leaves the red zone before the five seconds is up then you will fail the challenge.

If the robot enters the black zones then you must start again.
`,
    },
  };

  return challengeConfig;
}

function challengeC(): ChallengeConfig {
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
    name: "Lesson 2 - Challenge C",
    startPosition: { x: -2, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson2Challenge(finishZone, badZones),
    descriptions: {
      short: "Combining distance and turning",
      markdown: `
# Lesson 2 - Challenge C

Use the distance sensor to follow the path to the red zone.

Stay in the zone for five seconds to complete the challenge.

If the robot leaves the red zone before the five seconds is up then you will fail the challenge.

If the robot enters the black zones then you must start again.
`,
    },
  };

  return challengeConfig;
}

class Lesson2Challenge implements ChallengeListener {
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
          this.timeoutId = setTimeout(this.markComplete.bind(this), 5000);
          this.actions?.displayMessage(
            "Stay in the zone for 5 seconds",
            MessageType.info
          );
        } else if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
      } else if (e.zoneId.startsWith("bad-")) {
        this.actions?.displayMessage("Robot Looses!", MessageType.danger);
        this.actions?.setChallengeStatus(ChallengeStatus.Failure);
        this.actions?.terminateChallenge();
      }
    }
  }

  markComplete(): void {
    console.log("timeout now");
    this.actions?.displayMessage("Robot Wins!", MessageType.success);
    this.actions?.setChallengeStatus(ChallengeStatus.Success);
    this.actions?.terminateChallenge();
  }
}
