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
  return setupDefaultChallenge();
}

function setupDefaultChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Default",
    arenaConfig: getArenaConfig("Plain Arena"),
  };

  return challengeConfig;
}

function setupChallenge1(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Challenge1",
    arenaConfig: getArenaConfig("Plain Arena"),
  };

  return challengeConfig;
}

function setupParkingLotChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Parking Lot Challenge",
    arenaConfig: getArenaConfig("Parking Lot Arena"),
  };

  return challengeConfig;
}

function setupZigZagChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "ZigZag Challenge",
    arenaConfig: getArenaConfig("ZigZag Arena"),
  };

  return challengeConfig;
}

function setupBowlingChallenge(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Bowling Challenge",
    arenaConfig: getArenaConfig("Bowling Arena"),
  };

  return challengeConfig;
}
