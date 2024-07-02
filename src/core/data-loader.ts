import challengeIconAUrl from "../assets/challenge-icon-a.svg";
import challengeIconBUrl from "../assets/challenge-icon-b.svg";
import challengeIconCUrl from "../assets/challenge-icon-c.svg";

type Lesson = {
  lessonId: string;
  title: string;
  subtitle: string;
  description: string;
};

export type Challenge = {
  challengeId: string;
  lessonId: string;
  title: string;
  description: string;
  iconUrl: string;
};

type Resource = {
  resourceId: string;
  lessonId: string;
  downloadUrl: string;
  description: string;
};

type ResourceAggregate = Resource & { lesson?: Lesson };

const lessons: Lesson[] = [
  {
    lessonId: "1",
    title: "Motors",
    subtitle: "Lesson 1",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
  },
  {
    lessonId: "2",
    title: "Distance sensors",
    subtitle: "Lesson 2",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
  },
  {
    lessonId: "3",
    title: "Advanced driving",
    subtitle: "Lesson 3",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
  },
  {
    lessonId: "4",
    title: "Colour sensor",
    subtitle: "Lesson 4",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
  },
  {
    lessonId: "5",
    title: "Against the clock",
    subtitle: "Lesson 5",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
  },
];

const challenges: Challenge[] = [
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

const resources: Resource[] = [
  {
    resourceId: "1",
    lessonId: "1",
    downloadUrl: "https://example.com/download",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
  },
  {
    resourceId: "2",
    lessonId: "2",
    downloadUrl: "https://example.com/download",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
  },
  {
    resourceId: "3",
    lessonId: "3",
    downloadUrl: "https://example.com/download",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
  },
  {
    resourceId: "4",
    lessonId: "4",
    downloadUrl: "https://example.com/download",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
  },
  {
    resourceId: "5",
    lessonId: "5",
    downloadUrl: "https://example.com/download",
    description:
      "Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate.",
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
  return lessons;
};

/**
 * Load the data for specific lesson.
 */
export const loadLessonData = async (
  lessonId: string,
): Promise<Lesson | undefined> => {
  return lessons.find((l) => l.lessonId === lessonId);
};

/**
 * Load the data for challenges.
 */
export const loadChallengesData = async (
  lessonId: string,
): Promise<Challenge[]> => {
  return challenges.filter((c) => c.lessonId === lessonId);
};

/**
 * Load the data for specific challenge.
 */
export const loadChallengeData = async (
  challengeId: string,
): Promise<Challenge> => {
  return challenges.find((c) => c.challengeId === challengeId)!;
};

/**
 * Load the data for resources.
 */
export const loadResourcesData = async (): Promise<ResourceAggregate[]> => {
  return resources.map((r) => ({
    ...r,
    lesson: lessons.find((l) => l.lessonId === r.lessonId),
  }));
};

/**
 * Load the data for specific resource.
 */
export const loadResourceData = async (
  resourceId: string,
): Promise<ResourceAggregate | undefined> => {
  const resource = resources.find((r) => r.resourceId === resourceId);
  if (!resource) {
    return;
  }

  return {
    ...resource,
    lesson: lessons.find((l) => l.lessonId === resource.lessonId),
  };
};
