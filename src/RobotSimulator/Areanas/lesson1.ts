import { ArenaConfig, ChallengeConfig } from "./base";
import { createFinishZoneSpec } from "./common";

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
          y: 8,
          z: 14,
        },
      },
    },
  };

  return arenaConfig;
}

function challengeA(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge A",
    startPosition: { x: 0, y: 8 },
    finishZoneSpec: createFinishZoneSpec({ x: 0, y: -8 }),
    arenaConfig: arena(),
  };

  return challengeConfig;
}

function challengeB(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge B",
    startPosition: { x: 8, y: 8 },
    finishZoneSpec: createFinishZoneSpec({ x: -8, y: 8 }),
    arenaConfig: arena(),
  };

  return challengeConfig;
}
