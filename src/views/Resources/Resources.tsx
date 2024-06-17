import styled from "styled-components";
import { FC } from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { LessonCard, MascotType } from "../../components/LessonCard/LessonCard";
import { useResourcesQuery } from "../../hooks/query-hooks";

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

export const Resources: FC = () => {
  const { data: resources } = useResourcesQuery();

  return (
    <Wrap>
      <PageHeader
        backgroundType="blue-1"
        markerText="For teachers"
        heading="Guidance & Resources"
        description="Hello and welcome to the Kobot simulator lesson pack, our simulator has been put together to engage young people in."
      />
      <Grid>
        {resources?.map(
          (resource, index) =>
            resource.lesson && (
              <LessonCard
                key={resource.resourceId}
                mascotType={(index + 1) as MascotType}
                subtitle={resource.lesson.subtitle}
                title={resource.lesson.title}
                description={resource.description}
                buttonTextPrimary="View Guidance"
                buttonDestPrimary={resource.resourceId}
                buttonTextSecondary="Download Resources"
                buttonDestSecondary={resource.downloadUrl}
                buttonTextTertiary="Go to Lesson"
                buttonDestTertiary={`/lessons/${resource.lessonId}`}
              />
            ),
        )}
      </Grid>
    </Wrap>
  );
};
