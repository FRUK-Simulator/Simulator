import { ChallengeConfig } from "./Arenas/base";
import * as Lesson1 from "./Arenas/lesson1";
import * as Lesson3 from "./Arenas/lesson3";
import * as ParkingLot from "./Arenas/parkinglot";
import * as Bowling from "./Arenas/bowling";

let challengeConfigs: Array<ChallengeConfig> = [
  ...Lesson1.challenges,
  ...Lesson3.challenges,
  ...ParkingLot.challenges,
  ...Bowling.challenges,
].map((getChallenge) => getChallenge());

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
