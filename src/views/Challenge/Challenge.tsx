import { FC } from "react";
import { useChallengeQuery, useLessonQuery } from "../../hooks/query-hooks";
import { useAppParams } from "../../hooks/util-hooks";
import { ChallengeHeader } from "./ChallengeHeader";
import { H4 } from "../../ui/Typography";

/**
 * Route view component hosting simulator
 */
export const Challenge: FC = () => {
  const { lessonId, challengeId } = useAppParams();

  if (!lessonId || !challengeId) {
    throw new Error("Lesson ID or Challenge ID is not found in current URL");
  }

  const { data: challenge } = useChallengeQuery(challengeId);

  const { data: lesson } = useLessonQuery(lessonId);

  return (
    <>
      <ChallengeHeader
        title={challenge?.title ?? ""}
        subtitle={lesson?.title ?? ""}
      />
      {/* TODO: debug purpose, cleanup after view implementation is done */}
      <H4>Fetched lesson object</H4>
      <pre>{JSON.stringify(lesson, undefined, 2)}</pre>
      <H4>Fetched challenge object</H4>
      <pre>{JSON.stringify(challenge, undefined, 2)}</pre>
    </>
  );
};
