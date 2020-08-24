import { ChallengeConfig } from "./Areanas/base";
import { expand } from "./Areanas/common";
import * as Lesson1 from "./Areanas/lesson1";
import * as ParkingLot from "./Areanas/parkinglot";
import * as ZigZag from "./Areanas/zigzag";
import * as Bowling from "./Areanas/bowling";

let challengeConfigs: Array<ChallengeConfig> = [
  ...expand(Lesson1.challenges),
  ...expand(ParkingLot.challenges),
  ...expand(ZigZag.challenges),
  ...expand(Bowling.challenges),
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
