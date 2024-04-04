import { QueryClient, useQuery } from "@tanstack/react-query";
import { loadChallengesData } from "../core/data-loader";

export const queryClient = new QueryClient();

export const useChallengesQuery = (lessonId: string) => {
  return useQuery({
    queryKey: ["challenges", lessonId],
    queryFn: () => loadChallengesData(lessonId),
  });
};
