import { ArenaConfig, ChallengeConfig } from "./base";
import { CoreSpecs, CoreSimTypes } from "@fruk/simulator-core";

export const arenas = [arena];
export const challenges = [challenge];

function getConeSpec(
  initialPosition: CoreSimTypes.Vector2d
): CoreSpecs.IConeSpec {
  const spec: CoreSpecs.IConeSpec = {
    type: "cone",
    baseColor: 0x980000,
    height: 1,
    radius: 0.2,
    initialPosition: initialPosition,
  };

  return spec;
}

function arena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Bowling",
    worldConfig: {
      zLength: 15,
      xLength: 5,
      walls: [],
      perimeter: {
        height: 0.5,
        thickness: 0.1,
      },
      camera: {
        position: {
          x: 0,
          y: 8,
          z: 5,
        },
      },
    },
    ballSpecs: [{ type: "ball", radius: 0.2, initialPosition: { x: 0, y: 5 } }],
    coneSpecs: [
      getConeSpec({ x: 1.5, y: -7 }),
      getConeSpec({ x: 0.5, y: -7 }),
      getConeSpec({ x: -0.5, y: -7 }),
      getConeSpec({ x: -1.5, y: -7 }),
      getConeSpec({ x: 1, y: -6 }),
      getConeSpec({ x: 0, y: -6 }),
      getConeSpec({ x: -1, y: -6 }),
      getConeSpec({ x: 0.5, y: -5 }),
      getConeSpec({ x: -0.5, y: -5 }),
      getConeSpec({ x: 0, y: -4 }),
    ],
  };

  return arenaConfig;
}

function challenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Bowling Challenge",
    startPosition: { x: 0, y: 7 },
    arenaConfig: arena(),
  };

  return challengeConfig;
}
