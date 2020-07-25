import { ArenaConfig, getArenaConfig } from "./ArenaConfigLoader";

let challengeConfigs: Array<ChallengeConfig> = [
  setupDefaultChallenge(),
  setupChallenge1(),
  setupChallenge1(),
  setupChallenge1(),
  setupParkingLotChallenge(),
  setupZigZagChallenge(),
  setupBowlingChallenge(),
];

export interface ChallengeConfig {
  name: string;
  arenaName: string; // Foreign key to arena table
  arenaConfig: ArenaConfig;
}

export function getChallengeNames(): Array<string> {
  let names: Array<string> = new Array<string>();
  for (let challengeConfig of challengeConfigs) {
    names.push(challengeConfig.name);
  }
  return names;
}

export function getChallengeNamesForArena(arenaName: string): Array<string> {
  let names: Array<string> = new Array<string>();
  for (let challengeConfig of challengeConfigs) {
    if (challengeConfig.arenaName === arenaName) {
      names.push(challengeConfig.name);
    }
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
  return setupDefaultChallenge();
}

function setupDefaultChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Default",
    arenaName: "Plain Arena",
    arenaConfig: getArenaConfig("Plain Arena"),
  };

  return challengeConfig;
}

function setupChallenge1(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Challenge1",
    arenaName: "Plain Arena",
    arenaConfig: getArenaConfig("Plain Arena"),
  };

  return challengeConfig;
}

function setupParkingLotChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Parking Lot Challenge",
    arenaName: "Parking Lot Arena",
    arenaConfig: getArenaConfig("Parking Lot Arena"),
  };

  return challengeConfig;
}

function setupZigZagChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "ZigZag Challenge",
    arenaName: "ZigZag Arena",
    arenaConfig: getArenaConfig("ZigZag Arena"),
  };

  return challengeConfig;
}

function setupBowlingChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Bowling Challenge",
    arenaName: "Bowling Arena",
    arenaConfig: getArenaConfig("Bowling Arena"),
  };

  return challengeConfig;
}
