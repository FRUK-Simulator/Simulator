import styled from "styled-components";
import { FC } from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { LessonCard, MascotType } from "../../components/LessonCard/LessonCard";
import { useLessonsQuery } from "../../hooks/query-hooks";

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
  const { data: lessons } = useLessonsQuery();

  return (
    <Wrap>
      <PageHeader
        backgroundType="pink-1"
        markerText="Lessons 1-5"
        heading="Simulator lessons"
        description="The simulator has been produced by a group of software engineers at Bloomberg in association with FIRST UK. It's simple solve every."
      />
      <Grid>
        {lessons?.map((lesson, index) => (
          <LessonCard
            key={lesson.lessonId}
            mascotType={(index + 1) as MascotType}
            progress={{ complete: 0, total: 3 }}
            subtitle={lesson.subtitle}
            title={lesson.title}
            description={lesson.description}
            buttonTextPrimary="View Challenges"
            buttonDestPrimary={lesson.lessonId}
          />
        ))}
      </Grid>
    </Wrap>
  );
};
