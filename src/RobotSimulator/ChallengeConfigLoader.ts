import { getArenaConfig } from "./ArenaConfigLoader";
import { ChallengeConfig } from "./Areanas/base";
import { createFinishZoneSpec, expand } from "./Areanas/common";
import * as Lesson1 from "./Areanas/lesson1";

let challengeConfigs: Array<ChallengeConfig> = [
  ...expand(Lesson1.challenges),
  setupParkingLotChallenge1(),
  setupParkingLotChallenge2(),
  setupZigZagChallenge(),
  setupBowlingChallenge(),
];

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
  return Lesson1.challenges[0]();
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
