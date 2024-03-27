import challengeIconAUrl from "../assets/challenge-icon-a.svg";
import challengeIconBUrl from "../assets/challenge-icon-b.svg";
import challengeIconCUrl from "../assets/challenge-icon-c.svg";

type Lesson = {
  lessonId: string;
};

export type Challenge = {
  challengeId: string;
  lessonId: string;
  title: string;
  description: string;
  iconUrl: string;
};

const dummyChallenges: Challenge[] = [
  {
    challengeId: "1",
    lessonId: "1",
    title: "Challenge A",
    description:
      "Using the motors. Eos magnam laboriosam est repellat non magnam.",
    iconUrl: challengeIconAUrl,
  },
  {
    challengeId: "2",
    lessonId: "1",
    title: "Challenge B",
    description:
      "Using the motors to turn corners. Magnam laboriosam est repellat non.",
    iconUrl: challengeIconBUrl,
  },
  {
    challengeId: "3",
    lessonId: "1",
    title: "Challenge C",
    description:
      "Using the motors to turn precise angles. Magnam laboriosam est repellat non.",
    iconUrl: challengeIconCUrl,
  },
];

/**
 * Load the data for the lessons.
 *
 * At the moment this is just a dummy static data loader, but with this layer of
 * abstraction we can easily switch to a dynamic data loader in the future. And
 * this is why we made it async so the switch will be seamless.
 */
export const loadLessonsData = async (): Promise<Lesson[]> => {
  // TODO: fill the data
  return [];
};

/**
 * Load the data for the challenges.
 */
export const loadChallengesData = async (
  lessonId: string,
): Promise<Challenge[]> => {
  return dummyChallenges.filter((c) => c.lessonId === lessonId);
};
