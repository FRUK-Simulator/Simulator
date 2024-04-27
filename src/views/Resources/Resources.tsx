import styled from "styled-components";
import { FC } from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { ResourcesCard } from "../../components/LessonCard/LessonCard";

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
  return (
    <Wrap>
      <PageHeader
        backgroundType="blue-1"
        markerText="For teachers"
        heading="Guidance & Resources"
        description="Hello and welcome to the Kobot simulator lesson pack, our simulator has been put together to engage young people in."
      />
      <Grid>
        <ResourcesCard
          lessonId=""
          mascotType={1}
          subtitle="Lesson 1"
          title="Motors"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Guidance"
          buttonTextSecondaryDownload="Download Resources"
          buttonTextTertiary="Go to Lesson"
        />
        <ResourcesCard
          lessonId=""
          mascotType={2}
          subtitle="Lesson 2"
          title="Distance sensors"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Guidance"
          buttonTextSecondaryDownload="Download Resources"
          buttonTextTertiary="Go to Lesson"
        />
        <ResourcesCard
          lessonId=""
          mascotType={3}
          subtitle="Lesson 3"
          title="Advanced driving"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Guidance"
          buttonTextSecondaryDownload="Download Resources"
          buttonTextTertiary="Go to Lesson"
        />
        <ResourcesCard
          lessonId=""
          mascotType={4}
          subtitle="Lesson 4"
          title="Colour sensor"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Guidance"
          buttonTextSecondaryDownload="Download Resources"
          buttonTextTertiary="Go to Lesson"
        />
        <ResourcesCard
          lessonId=""
          mascotType={5}
          subtitle="Lesson 5"
          title="Against the clock"
          description="Dolores et rerum hic quos sed at. Eos magnam laboriosam est repellat non. Dolores nihil suscipit quod voluptate."
          buttonTextPrimary="View Guidance"
          buttonTextSecondaryDownload="Download Resources"
          buttonTextTertiary="Go to Lesson"
        />
      </Grid>
    </Wrap>
  );
};
