import {
  ArenaConfig,
  ChallengeConfig,
  ChallengeListener,
  ChallengeActions,
  ChallengeEvent,
} from "./base";
import { IBoxSpec } from "@fruk/simulator-core/dist/engine/specs/CoreSpecs";

export const arenas = [arena];
export const challenges = [challengeA, challengeB];

function arena(): ArenaConfig {
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

function challengeA(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 3 - Challenge A",
    startPosition: { x: -3.5, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson3Challenge(),
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
    startPosition: { x: -3.5, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson3Challenge(),
    descriptions: {
      short: "Picking up blocks",
      markdown: `
# Lesson 3 - Challenge A

Drive the robot from the starting position along the path to the end.

Pick up the block using the grabber. Then drive it back to the starting position.

If the robot enters the black zones then you must start again.
`,
    },
  };

  let box: IBoxSpec = {
    type: "box",
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

  onStart(actions: ChallengeActions) {
    this.actions = actions;
  }

  onStop() {
    this.actions = undefined;
  }

  onEvent(e: ChallengeEvent) {}

  markComplete(): void {}
}
