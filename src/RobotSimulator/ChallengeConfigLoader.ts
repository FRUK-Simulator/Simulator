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

export function getChallengesPerArena(): Map<string, Array<ChallengeConfig>> {
  let challengesPerArena = new Map<string, Array<ChallengeConfig>>();

  for (let challengeConfig of challengeConfigs) {
    const arenaName = challengeConfig.arenaConfig.name;
    if (!challengesPerArena.has(arenaName)) {
      challengesPerArena.set(arenaName, []);
    }

    challengesPerArena.get(arenaName)!.push(challengeConfig);
  }

  return challengesPerArena;
}

export const getDefaultChallenge = Lesson1.challenges[0];
