import { QueryClient, useQuery } from "@tanstack/react-query";
import {
  loadChallengeData,
  loadChallengesData,
  loadLessonData,
  loadLessonsData,
} from "../core/data-loader";

export const queryClient = new QueryClient();

export const useLessonsQuery = () => {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: () => loadLessonsData(),
  });
};

export const useLessonQuery = (lessonId: string) => {
  return useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => loadLessonData(lessonId),
  });
};

export const useChallengesQuery = (lessonId: string) => {
  return useQuery({
    queryKey: ["challenges", lessonId],
    queryFn: () => loadChallengesData(lessonId),
  });
};

export const useChallengeQuery = (challengeId: string) => {
  return useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: () => loadChallengeData(challengeId),
  });
};
