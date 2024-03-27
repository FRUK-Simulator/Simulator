import styled from "styled-components";
import { FC } from "react";
import { PageHeader } from "../../ui/PageHeader/PageHeader";
import { LessonCard } from "../../ui/LessonCard/LessonCard";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
`;

const Grid = styled.div`
  display: grid;
  margin: 48px 70px 48px 70px;
  grid-template-columns: auto auto;
  gap: 32px;
`;

export const Lessons: FC = () => {
  return (
    <Wrap>
      <PageHeader
        backgroundType="pink-1"
        markerText="Lessons 1-5"
        heading="Simulator lessons"
        description="The simulator has been produced by a group of software engineers at Bloomberg in association with FIRST UK. It's simple solve every."
      />
      <Grid>
        <LessonCard
          mascotType="lesson-1"
          subtitle="Lesson 1"
          title="Motors"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          call2actionText="View Challenges"
          call2actionDest="../resources"
        />
        <LessonCard
          mascotType="lesson-2"
          subtitle="Lesson 2"
          title="Distance sensors"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          call2actionText="View Challenges"
          call2actionDest="../resources"
        />
        <LessonCard
          mascotType="lesson-3"
          subtitle="Lesson 3"
          title="Advanced driving"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          call2actionText="View Challenges"
          call2actionDest="../resources"
        />
        <LessonCard
          mascotType="lesson-4"
          subtitle="Lesson 4"
          title="Colour sensor"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          call2actionText="View Challenges"
          call2actionDest="../resources"
        />
        <LessonCard
          mascotType="lesson-5"
          subtitle="Lesson 5"
          title="Against the clock"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          call2actionText="View Challenges"
          call2actionDest="../resources"
        />
      </Grid>
    </Wrap>
  );
};
