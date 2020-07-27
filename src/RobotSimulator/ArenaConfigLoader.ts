import { WorldConfig, RobotSpecs } from "@fruk/simulator-core";
import { CoreSpecs } from "@fruk/simulator-core";
import { createDefaultRobotSpec } from "./RobotConfigLoader";
import {
  IZoneSpec,
  IRawZoneEvent,
} from "@fruk/simulator-core/dist/engine/specs/CoreSpecs";

var arenaConfigs: any = {
  "Plain Arena": setupPlainArena(),
  "Parking Lot Arena": setupParkingLotArena(),
  "ZigZag Arena": setupZigZagArena(),
  "Bowling Arena": setupBowlingArena(),
  "Challenge Arena One: A": setupChallengeArenaOne({ startingLocation: "A" }),
  "Challenge Arena One: B": setupChallengeArenaOne({ startingLocation: "B" }),
};

export interface ArenaConfig {
  worldConfig: WorldConfig;
  robotSpec: RobotSpecs.IRobotSpec;
  ballSpecs?: CoreSpecs.IBallSpec[];
  boxSpecs?: CoreSpecs.IBoxSpec[];
  coneSpecs?: CoreSpecs.IConeSpec[];
  zoneSpecs?: CoreSpecs.IZoneSpec[];
  zoneEntryCallback?: (event: IRawZoneEvent) => void;
  zoneExitCallback?: (event: IRawZoneEvent) => void;
}

export function getArenaNames(): Array<string> {
  return Object.keys(arenaConfigs);
}

export function getDefaultArenaName(): string {
  return "Challenge Arena One: A";
}

export function getArenaConfig(name?: string): ArenaConfig {
  if (name) {
    for (var property in arenaConfigs) {
      if (arenaConfigs.hasOwnProperty(property) && property === name) {
        return arenaConfigs[property];
      }
    }
  }

  throw new Error("Unable to load arena");
}

function setupPlainArena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    worldConfig: {
      zLength: 20,
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
    robotSpec: createDefaultRobotSpec(),
  };

  return arenaConfig;
}

function setupParkingLotArena(): ArenaConfig {
  const height: number = 1;
  const thickness: number = 0.3;
  const length: number = 4;
  const width: number = 3;
  const arenaConfig: ArenaConfig = {
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
    robotSpec: createDefaultRobotSpec(),
  };

  return arenaConfig;
}

function setupZigZagArena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
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
    robotSpec: createDefaultRobotSpec(),
  };

  return arenaConfig;
}

function setupBowlingArena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
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
    robotSpec: createDefaultRobotSpec(),
  };

  return arenaConfig;
}

function setupChallengeArenaOne(options: {
  startingLocation: string;
}): ArenaConfig {
  let worldConfig: WorldConfig = {
    zLength: 10,
    xLength: 10,
    walls: [],
    camera: {
      position: {
        x: 0,
        y: 5,
        z: 5,
      },
    },
  };

  let robotSpec = createDefaultRobotSpec();

  switch (options.startingLocation) {
    case "A": {
      robotSpec.initialPosition = { x: 0, y: 4.5 };
      break;
    }
    case "B": {
      robotSpec.initialPosition = { x: -4.5, y: 4.5 };
      break;
    }
    default:
      throw new Error("Unknown starting location");
  }

  let zoneSpecs: IZoneSpec[] = [
    {
      type: "zone",
      zoneId: "a-guide-bottom",
      xLength: 1.5,
      zLength: 8.5,
      baseColor: 0xff3344,
      initialPosition: { x: 0, y: 0.75 },
    },
    {
      type: "zone",
      zoneId: "a-guide-finish",
      xLength: 1.5,
      zLength: 1.5,
      baseColor: 0x3344ff,
      initialPosition: { x: 0, y: -4.25 },
    },
    {
      type: "zone",
      zoneId: "b-guide-top",
      xLength: 1.5,
      zLength: 1.5,
      baseColor: 0x3344ff,
      opacity: 0,
      initialPosition: { x: 0, y: -4.25 },
    },
    {
      type: "zone",
      zoneId: "b-guide-left",
      xLength: 1.5,
      zLength: 10,
      baseColor: 0x33ff44,
      initialPosition: { x: -4.25, y: 0 },
    },
    {
      type: "zone",
      zoneId: "b-guide-right",
      xLength: 1.5,
      zLength: 10,
      baseColor: 0x33ff44,
      initialPosition: { x: 4.25, y: 0 },
    },
    {
      type: "zone",
      zoneId: "b-guide-top-left",
      xLength: 3.5,
      zLength: 1.5,
      baseColor: 0x33ff44,
      initialPosition: { x: -2.5, y: -4.25 },
    },
    {
      type: "zone",
      zoneId: "b-guide-top-right",
      xLength: 3.5,
      zLength: 1.5,
      baseColor: 0x33ff44,
      initialPosition: { x: 2.5, y: -4.25 },
    },
  ];

  let successCountdown: number | null = null;

  let zoneEntryCallback = (event: IRawZoneEvent) => {
    if (event.zoneId == "a-guide-finish" && options.startingLocation == "A") {
      if (successCountdown) {
        clearTimeout(successCountdown);
      }
      successCountdown = window.setTimeout(() => {
        alert("Success");
      }, 2000);
    }
  };

  let zoneExitCallback = (event: IRawZoneEvent) => {
    if (event.zoneId == "a-guide-finish" && options.startingLocation == "A") {
      if (successCountdown) {
        clearTimeout(successCountdown);
      }
    }
  };

  let arenaConfig: ArenaConfig = {
    worldConfig: worldConfig,
    robotSpec: robotSpec,
    zoneSpecs: zoneSpecs,
    zoneEntryCallback: zoneEntryCallback,
    zoneExitCallback: zoneExitCallback,
  };

  return arenaConfig;
}
