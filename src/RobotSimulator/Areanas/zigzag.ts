import { ArenaConfig, ChallengeConfig } from "./base";
import { createFinishZoneSpec } from "./common";

export const arenas = [arena];
export const challenges = [challenge];

function arena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "ZigZag",
    worldConfig: {
      zLength: 40,
      xLength: 20,
      walls: [],
      camera: {
        position: {
          x: 0,
          y: 8,
          z: 10,
        },
      },
    },
    coneSpecs: [
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 0, y: -15 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 2, y: -10 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: -2, y: -5 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 2, y: 0 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: -2, y: 5 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 2, y: 10 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 0, y: 15 },
      },
    ],
  };

  return arenaConfig;
}

function challenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "ZigZag Challenge",
    startPosition: { x: 0, y: 0 },
    finishZoneSpec: createFinishZoneSpec({ x: 0, y: 0 }),
    arenaConfig: arena(),
  };

  return challengeConfig;
}
