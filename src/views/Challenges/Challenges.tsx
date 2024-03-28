import { Content } from "../../ui/Content";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { useAppParams, useLoadChallengesData } from "../../hooks/util-hooks";
import { ChallengeList } from "./ChallengeList";

export const Challenges = () => {
  const { lessonId } = useAppParams();

  if (!lessonId) {
    throw new Error("Lesson ID is not found in current URL");
  }

  // TODO: improve getting challenges data by lessonId
  // we could reuse some of the logic from ChallengeConfigLoader.ts, but we should
  // really make a sustainable JSON based data structure so that we can easily
  // add new lessons in the future as well as migrate the existing data to a
  // persistent storage like a database or CMS
  const { data, loading, error } = useLoadChallengesData(lessonId);

  return (
    <>
      <PageHeader
        backgroundType="pink-2"
        markerText={`Lesson ${lessonId}`}
        heading="Motors"
        description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
      />
      <Content>
        {/* TODO: improve loading and error handling screens */}
        {loading && <>Loading...</>}
        {!!error && <>Error: {error}</>}
        {data && <ChallengeList challenges={data} />}
      </Content>
    </>
  );
};
