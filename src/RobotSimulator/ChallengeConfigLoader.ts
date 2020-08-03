import { ArenaConfig, getArenaConfig } from "./ArenaConfigLoader";
import { CoreSpecs, CoreSimTypes } from "@fruk/simulator-core";

let challengeConfigs: Array<ChallengeConfig> = [
  setupLesson1ChallengeA(),
  setupLesson1ChallengeB(),
  setupParkingLotChallenge1(),
  setupParkingLotChallenge2(),
  setupZigZagChallenge(),
  setupBowlingChallenge(),
];

export interface ChallengeConfig {
  name: string;
  startPosition: CoreSimTypes.Vector2d;
  finishZoneSpec?: CoreSpecs.IZoneSpec;
  arenaConfig: ArenaConfig;
}

export function getChallengesPerArena(): Map<string, Array<string>> {
  let challengesPerArena = new Map();

  for (let challengeConfig of challengeConfigs) {
    if (challengesPerArena.has(challengeConfig.arenaConfig.name)) {
      challengesPerArena
        .get(challengeConfig.arenaConfig.name)
        .push(challengeConfig.name);
    } else {
      challengesPerArena.set(
        challengeConfig.arenaConfig.name,
        new Array<string>(challengeConfig.name)
      );
    }
  }

  return challengesPerArena;
}

export function getChallengeNames(): Array<string> {
  let names: Array<string> = new Array<string>();
  for (let challengeConfig of challengeConfigs) {
    names.push(challengeConfig.name);
  }
  return names;
}

export function getChallengeConfig(name: string): ChallengeConfig {
  for (let challengeConfig of challengeConfigs) {
    if (challengeConfig.name === name) {
      return challengeConfig;
    }
  }

  // return default if 'name' not found
  return setupLesson1ChallengeA();
}

function setupLesson1ChallengeA(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge A",
    startPosition: { x: 0, y: 8 },
    finishZoneSpec: createFinishZoneSpec({ x: 0, y: -8 }),
    arenaConfig: getArenaConfig("Lesson 1"),
  };

  return challengeConfig;
}

function setupLesson1ChallengeB(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge B",
    startPosition: { x: 8, y: 8 },
    finishZoneSpec: createFinishZoneSpec({ x: -8, y: 8 }),
    arenaConfig: getArenaConfig("Lesson 1"),
  };

  return challengeConfig;
}

function setupParkingLotChallenge1(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Parking Lot Challenge 1",
    startPosition: { x: 0, y: 0 },
    finishZoneSpec: createFinishZoneSpec({ x: 7, y: -13 }),
    arenaConfig: getArenaConfig("Parking Lot"),
  };

  return challengeConfig;
}

function setupParkingLotChallenge2(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Parking Lot Challenge 2",
    startPosition: { x: 0, y: 0 },
    finishZoneSpec: createFinishZoneSpec({ x: -9, y: -10 }),
    arenaConfig: getArenaConfig("Parking Lot"),
  };

  return challengeConfig;
}

function setupZigZagChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "ZigZag Challenge",
    startPosition: { x: 0, y: 0 },
    finishZoneSpec: createFinishZoneSpec({ x: 0, y: 0 }),
    arenaConfig: getArenaConfig("ZigZag"),
  };

  return challengeConfig;
}

function setupBowlingChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Bowling Challenge",
    startPosition: { x: 0, y: 10 },
    arenaConfig: getArenaConfig("Bowling"),
  };

  return challengeConfig;
}

function createFinishZoneSpec(
  initialPosition: CoreSimTypes.Vector2d
): CoreSpecs.IZoneSpec {
  let finishZoneSpec: CoreSpecs.IZoneSpec = {
    type: "zone",
    zoneId: "finish",
    xLength: 2,
    zLength: 2,
    baseColor: 0x00ff00,
    initialPosition: initialPosition,
  };

  return finishZoneSpec;
}
