import { ArenaConfig, ChallengeConfig } from "./base";
import { createFinishZoneSpec } from "./common";

export const arenas = [arena];
export const challenges = [challengeA, challengeB];

function arena(): ArenaConfig {
  const height: number = 1;
  const thickness: number = 0.3;
  const length: number = 4;
  const width: number = 3;
  const arenaConfig: ArenaConfig = {
    name: "Parking Lot",
    worldConfig: {
      zLength: 30,
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
    boxSpecs: [
      {
        type: "box",
        dimensions: { x: thickness, y: height, z: length },
        initialPosition: { x: 9, y: -13 },
      },
      {
        type: "box",
        dimensions: { x: thickness, y: height, z: length },
        initialPosition: { x: 5, y: -13 },
      },
      {
        type: "box",
        dimensions: { x: width, y: height, z: thickness },
        initialPosition: { x: -8.5, y: -12 },
      },
      {
        type: "box",
        dimensions: { x: width, y: height, z: thickness },
        initialPosition: { x: -8.5, y: -8 },
      },
    ],
  };

  return arenaConfig;
}

function challengeA(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Parking Lot Challenge 1",
    startPosition: { x: 0, y: 0 },
    finishZoneSpec: createFinishZoneSpec({ x: 7, y: -13 }),
    arenaConfig: arena(),
  };

  return challengeConfig;
}

function challengeB(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Parking Lot Challenge 2",
    startPosition: { x: 0, y: 0 },
    finishZoneSpec: createFinishZoneSpec({ x: -9, y: -10 }),
    arenaConfig: arena(),
  };

  return challengeConfig;
}
