import { ChallengeConfig } from "./Arenas/base";
import * as Lesson1 from "./Arenas/lesson1";
import * as Lesson2 from "./Arenas/lesson2";
import * as Lesson3 from "./Arenas/lesson3";
import * as Lesson4 from "./Arenas/lesson4";
import * as Lesson5 from "./Arenas/lesson5";

let challengeConfigs: Array<ChallengeConfig> = [
  ...Lesson1.challenges,
  ...Lesson2.challenges,
  ...Lesson3.challenges,
  ...Lesson4.challenges,
  ...Lesson5.challenges,
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

export function getChallengeFromURL(lesson: string, challenge: string) {
  return (
    getChallengesPerArena()
      .get(lesson)
      ?.find((c) => c.name === challenge) ?? getDefaultChallenge()
  );
}
