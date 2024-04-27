import styled from "styled-components";
import { FC } from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { LessonCard } from "../../components/LessonCard/LessonCard";

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
          lessonId="1"
          mascotType={1}
          progress={0}
          subtitle="Lesson 1"
          title="Motors"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Challenges"
        />
        <LessonCard
          lessonId="2"
          mascotType={2}
          progress={1}
          subtitle="Lesson 2"
          title="Distance sensors"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Challenges"
        />
        <LessonCard
          lessonId="3"
          mascotType={3}
          progress={2}
          subtitle="Lesson 3"
          title="Advanced driving"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Challenges"
        />
        <LessonCard
          lessonId="4"
          mascotType={4}
          progress={3}
          subtitle="Lesson 4"
          title="Colour sensor"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Challenges"
        />
        <LessonCard
          lessonId="5"
          mascotType={5}
          progress={3}
          subtitle="Lesson 5"
          title="Against the clock"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Challenges"
        />
      </Grid>
    </Wrap>
  );
};
