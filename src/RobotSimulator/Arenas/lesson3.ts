import {
  ArenaConfig,
  ChallengeConfig,
  ChallengeListener,
  ChallengeActions,
  ChallengeEvent,
} from "./base";
import { IBoxSpec } from "@fruk/simulator-core/dist/engine/specs/CoreSpecs";
import { ChallengeStatus } from "./challengeSlice";
import { MessageType } from "../../state/messagesSlice";

export const arenas = [largeArena];
export const challenges = [challengeA, challengeB, challengeC];

enum Lesson3Goal {
  GET_TO_FINISH,
  MOVE_BLOCK_TO_START,
}

function largeArena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 3 - Advanced Driving",
    worldConfig: {
      zLength: 5,
      xLength: 8,
      walls: [],
      perimeter: {
        height: 0.5,
        thickness: 0.1,
      },
      camera: {
        position: {
          x: 3,
          y: 3,
          z: 3,
        },
      },
    },
    zoneSpecs: [
      // Start / end zones
      {
        type: "zone",
        zoneId: "start",
        baseColor: 0x006600,
        initialPosition: {
          x: -3.5,
          y: 2,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "end",
        baseColor: 0x660000,
        initialPosition: {
          x: 3.5,
          y: 2,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      // Bad zones
      {
        type: "zone",
        zoneId: "bad-a",
        baseColor: 0x444444,
        initialPosition: {
          x: -2.5,
          y: 0.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 4,
        },
      },
      {
        type: "zone",
        zoneId: "bad-b",
        baseColor: 0x444444,
        initialPosition: {
          x: 2.5,
          y: 0.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 4,
        },
      },
      {
        type: "zone",
        zoneId: "bad-c",
        baseColor: 0x444444,
        initialPosition: {
          x: 0.5,
          y: -0.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 4,
        },
      },
      {
        type: "zone",
        zoneId: "bad-d",
        baseColor: 0x444444,
        initialPosition: {
          x: 0.5,
          y: -0.5,
        },
        zoneShape: {
          type: "polygon",
          points: [
            { x: -2.5, y: 3 },
            { x: -1.5, y: 3 },
            { x: -2.5, y: -1 },
          ],
        },
      },
      {
        type: "zone",
        zoneId: "bad-e",
        baseColor: 0x444444,
        initialPosition: {
          x: 0.5,
          y: -0.5,
        },
        zoneShape: {
          type: "polygon",
          points: [
            { x: -0.5, y: 2 },
            { x: -0.5, y: -2 },
            { x: -1.5, y: -2 },
          ],
        },
      },
    ],
  };

  return arenaConfig;
}

function smallArena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 3 - Advanced Driving",
    worldConfig: {
      zLength: 5,
      xLength: 1,
      walls: [],
      perimeter: {
        height: 0.5,
        thickness: 0.1,
      },
      camera: {
        position: {
          x: 3,
          y: 3,
          z: 3,
        },
      },
    },
    zoneSpecs: [
      // Start / end zones
      {
        type: "zone",
        zoneId: "start",
        baseColor: 0x006600,
        initialPosition: {
          x: 0,
          y: 2,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "end",
        baseColor: 0x660000,
        initialPosition: {
          x: 0,
          y: -2,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
    ],
  };

  return arenaConfig;
}

function challengeA(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 3 - Challenge A",
    startPosition: { x: -3.5, y: 2 },
    arenaConfig: largeArena(),
    eventListener: new Lesson3Challenge(Lesson3Goal.GET_TO_FINISH),
    descriptions: {
      short: "Move along the path",
      markdown: `
# Lesson 3 - Challenge A

Drive the robot from the starting position along the path to the end.

If the robot enters the black zones then you must start again.
      `,
    },
  };

  return challengeConfig;
}

function challengeB(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 3 - Challenge B",
    startPosition: { x: 0, y: 2 },
    arenaConfig: smallArena(),
    eventListener: new Lesson3Challenge(Lesson3Goal.MOVE_BLOCK_TO_START),
    descriptions: {
      short: "Picking up blocks",
      markdown: `
# Lesson 3 - Challenge B

Drive the robot from the starting position along the path to the end.

Pick up the block using the grabber. Then drive it back to the starting position.

If the robot enters the black zones then you must start again.
      `,
    },
  };

  const box: IBoxSpec = {
    type: "box",
    id: "box",
    dimensions: {
      x: 0.25,
      y: 0.25,
      z: 0.25,
    },
    initialPosition: {
      x: 0,
      y: -2,
    },
    baseColor: 0xffffff,
    isStatic: false,
  };

  if (!challengeConfig.arenaConfig.boxSpecs) {
    challengeConfig.arenaConfig.boxSpecs = [];
  }
  challengeConfig.arenaConfig.boxSpecs.push(box);

  return challengeConfig;
}

function challengeC(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 3 - Challenge C",
    startPosition: { x: -3.5, y: 2 },
    arenaConfig: largeArena(),
    eventListener: new Lesson3Challenge(Lesson3Goal.MOVE_BLOCK_TO_START),
    descriptions: {
      short: "Picking up blocks",
      markdown: `
# Lesson 3 - Challenge C

Drive the robot from the starting position along the path to the end.

Pick up the block using the grabber. Then drive it back to the starting position.

If the robot enters the black zones then you must start again.
`,
    },
  };

  const box: IBoxSpec = {
    type: "box",
    id: "box",
    dimensions: {
      x: 0.25,
      y: 0.25,
      z: 0.25,
    },
    initialPosition: {
      x: 3.5,
      y: 2,
    },
    baseColor: 0xffffff,
    isStatic: false,
  };

  if (!challengeConfig.arenaConfig.boxSpecs) {
    challengeConfig.arenaConfig.boxSpecs = [];
  }
  challengeConfig.arenaConfig.boxSpecs.push(box);

  return challengeConfig;
}

class Lesson3Challenge implements ChallengeListener {
  actions?: ChallengeActions;

  constructor(public goal: Lesson3Goal) {}

  onStart(actions: ChallengeActions) {
    this.actions = actions;
  }

  onStop() {
    this.actions = undefined;
  }

  onEvent(e: ChallengeEvent) {
    if (e.kind === "ZoneEvent" && e.id === "robo") {
      if (e.entry && e.zoneId.startsWith("bad")) {
        //this.actions?.setChallengeStatus(ChallengeStatus.Failure);
        this.actions?.displayMessage(
          "Robot left the track area",
          MessageType.danger
        );
        return;
      }
      if (e.entry && e.zoneId === "end") {
        if (this.goal === Lesson3Goal.GET_TO_FINISH) {
          this.actions?.setChallengeStatus(ChallengeStatus.Success);
          this.actions?.displayMessage(
            "Robot finished the challenge",
            MessageType.success
          );
          this.actions?.terminateChallenge();
          return;
        }

        if (this.goal === Lesson3Goal.MOVE_BLOCK_TO_START) {
          this.actions?.displayFadingMessage(
            "Now grab the block",
            MessageType.info,
            5000
          );
          return;
        }
      }
    }

    if (e.kind === "ZoneEvent" && e.id === "box") {
      if (!e.entry && e.zoneId.startsWith("end")) {
        if (this.goal === Lesson3Goal.MOVE_BLOCK_TO_START) {
          this.actions?.displayFadingMessage(
            "Now move the block to the starting area",
            MessageType.info,
            5000
          );
          return;
        }
      }
      if (e.entry && e.zoneId.startsWith("start")) {
        this.actions?.setChallengeStatus(ChallengeStatus.Success);
        this.actions?.displayMessage(
          "Robot finished the challenge",
          MessageType.success
        );
        this.actions?.terminateChallenge();
        return;
      }
    }

    console.debug("Unprocessed Event", e);
  }

  markComplete(): void {}
}
