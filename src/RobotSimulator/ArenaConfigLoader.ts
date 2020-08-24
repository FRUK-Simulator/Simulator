import { ArenaConfig } from "./Areanas/base";
import * as Lesson1 from "./Areanas/lesson1";
import { expand } from "./Areanas/common";

let arenaConfigs: Array<ArenaConfig> = [
  ...expand(Lesson1.arenas),
  setupParkingLotArena(),
  setupZigZagArena(),
  setupBowlingArena(),
];

export function getArenaConfig(name: string): ArenaConfig {
  for (let arenaConfig of arenaConfigs) {
    if (arenaConfig.name === name) {
      return arenaConfig;
    }
  }

  // return default arena if 'name' not found
  return Lesson1.arenas[0]();
}

function setupParkingLotArena(): ArenaConfig {
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

function setupZigZagArena(): ArenaConfig {
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

function setupBowlingArena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Bowling",
    worldConfig: {
      zLength: 60,
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
    ballSpecs: [{ type: "ball", radius: 1, initialPosition: { x: 0, y: -5 } }],
    coneSpecs: [
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 1.5, y: -25 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: -1.5, y: -25 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 4.5, y: -25 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: -4.5, y: -25 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 0, y: -22 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 3, y: -22 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: -3, y: -22 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 1.5, y: -19 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: -1.5, y: -19 },
      },
      {
        type: "cone",
        baseColor: 0x980000,
        height: 5,
        radius: 0.5,
        initialPosition: { x: 0, y: -16 },
      },
    ],
  };

  return arenaConfig;
}
