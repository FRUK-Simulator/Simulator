import { FC } from "react";
import styled from "styled-components";
import shapesBgLessonUrl from "./shapes-bg-lesson.svg";
import shapesMascotLesson1Url from "./shapes-mascot-lesson1.svg";
import shapesMascotLesson2Url from "./shapes-mascot-lesson2.svg";
import shapesMascotLesson3Url from "./shapes-mascot-lesson3.svg";
import shapesMascotLesson4Url from "./shapes-mascot-lesson4.svg";
import shapesMascotLesson5Url from "./shapes-mascot-lesson5.svg";
import shapeGear from "./shape-gear.svg";
import { H3, Subheading2, P } from "../../ui/Typography";
import { Button } from "../../ui/Button";

type MascotType =
  | "lesson-1"
  | "lesson-2"
  | "lesson-3"
  | "lesson-4"
  | "lesson-5";

const Wrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;

const BlockMascot = styled.div<{
  $mascotType: MascotType;
}>`
  min-height: 450px;
  flex-grow: 2;
  flex-basis: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: var(--color-blue-dark);
  background-image: url(${shapesBgLessonUrl});
`;

const ImageMascot = styled.img`
  width: 60%;
  flex-shrink: 1;
`;

const DivProgress = styled.div`
  background-color: var(--color-blue-dark);
  margin-top: var(--spacing-medium);
  padding: var(--spacing) var(--spacing-medium);
  border-radius: var(--border-radius-small);
  color: var(--color-white);
  display: flex;
  gap: var(--spacing-medium);
  align-items: center;
`;

const BlockLesson = styled.div`
  flex-grow: 3;
  flex-basis: 0;
  display: flex;
  flex-wrap: nowrap;
  background-color: var(--color-white);
`;

const LessonDetails = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  padding: 64px 48px 64px 48px;
`;

const Subheading = styled(Subheading2)`
  margin: 0;
  color: var(--color-red);
`;

const Heading = styled(H3)`
  margin: 0;
  line-height: 48px;
`;

const Paragraph = styled(P)`
  margin: 0;
  padding: 8px 12% 56px 0;
  line-height: 19px;
`;

const Hr = styled.hr`
  margin: var(--spacing-x-large) 0 var(--spacing-x-large) 0;
`;

const StyledButton = styled(Button)``;

type Props = {
  lessonId: string;
  subtitle?: string;
  title: string;
  description: string;
  isResourcesCard?: boolean;
  mascotType: MascotType;
};

export const LessonCard: FC<Props> = ({
  lessonId,
  subtitle,
  title,
  description,
  isResourcesCard,
  mascotType,
}) => {
  const progress = 0;  // TODO: pass `progress`, change mascot according to `progress`
  let mascotUrl;
  switch (mascotType) {
    case "lesson-1":
      mascotUrl = shapesMascotLesson1Url;
      break;
    case "lesson-2":
      mascotUrl = shapesMascotLesson2Url;
      break;
    case "lesson-3":
      mascotUrl = shapesMascotLesson3Url;
      break;
    case "lesson-4":
      mascotUrl = shapesMascotLesson4Url;
      break;
    case "lesson-5":
      mascotUrl = shapesMascotLesson5Url;
      break;
    default:
      mascotUrl = shapesMascotLesson1Url;
      break;
  }
  const call2actionText = isResourcesCard ? "View Guidance" : "View Challenges";
  return (
    <Wrap>
      <BlockMascot $mascotType={mascotType}>
        <ImageMascot src={mascotUrl} />
        <DivProgress>
          <img src={shapeGear} />
          <span>{progress}/3</span>
        </DivProgress>
      </BlockMascot>
      <BlockLesson>
        <LessonDetails>
          <Subheading>{subtitle}</Subheading>
          <Heading>{title}</Heading>
          <Paragraph>{description}</Paragraph>
          {call2actionText && (
            <StyledButton type="primary" to={lessonId}>
              {call2actionText}
            </StyledButton>
          )}
          {isResourcesCard && (<>
            <StyledButton type="secondary" to={lessonId}>
              Download Resources
            </StyledButton>
            <Hr />
            <StyledButton type="tertiary" to={lessonId}>
              Go to Lesson
            </StyledButton>
          </>)}
        </LessonDetails>
      </BlockLesson>
    </Wrap>
  );
};
