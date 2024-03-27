import { FC } from "react";
import styled from "styled-components";
import shapesBgLesson1Url from "./shapes-bg-lesson1.svg";
import shapesBgLesson2Url from "./shapes-bg-lesson2.svg";
import shapesBgLesson3Url from "./shapes-bg-lesson3.svg";
import shapesBgLesson4Url from "./shapes-bg-lesson4.svg";
import shapesBgLesson5Url from "./shapes-bg-lesson5.svg";
import shapesMascotLesson1Url from "./shapes-mascot-lesson1.svg";
import shapesMascotLesson2Url from "./shapes-mascot-lesson2.svg";
import shapesMascotLesson3Url from "./shapes-mascot-lesson3.svg";
import shapesMascotLesson4Url from "./shapes-mascot-lesson4.svg";
import shapesMascotLesson5Url from "./shapes-mascot-lesson5.svg";
import { H3, Subheading2, P } from "../Typography";
import { Button } from "../Button";

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

  ${(props) =>
    props.$mascotType === "lesson-1" &&
    `
    background-image: url(${shapesBgLesson1Url});
  `}

  ${(props) =>
    props.$mascotType === "lesson-2" &&
    `
    background-image: url(${shapesBgLesson2Url});
  `}

  ${(props) =>
    props.$mascotType === "lesson-3" &&
    `
    background-image: url(${shapesBgLesson3Url});
  `}

  ${(props) =>
    props.$mascotType === "lesson-4" &&
    `
    background-image: url(${shapesBgLesson4Url});
  `}

  ${(props) =>
    props.$mascotType === "lesson-5" &&
    `
    background-image: url(${shapesBgLesson5Url});
  `}
`;

const ImageMascot = styled.img`
  width: 60%;
  flex-shrink: 1;
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

const StyledButton = styled(Button)``;

type Props = {
  subtitle?: string;
  title: string;
  description: string;
  call2actionText?: string;
  call2actionDest?: string;
  mascotType: MascotType;
};

export const LessonCard: FC<Props> = ({
  subtitle,
  title,
  description,
  call2actionText,
  call2actionDest,
  mascotType,
}) => {
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
  return (
    <Wrap>
      <BlockMascot $mascotType={mascotType}>
        <ImageMascot src={mascotUrl} />
      </BlockMascot>
      <BlockLesson>
        <LessonDetails>
          <Subheading>{subtitle}</Subheading>
          <Heading>{title}</Heading>
          <Paragraph>{description}</Paragraph>
          {call2actionText !== undefined && call2actionDest !== undefined && (
            <StyledButton type="primary" to={call2actionDest}>
              {call2actionText.toLocaleUpperCase()}
            </StyledButton>
          )}
        </LessonDetails>
      </BlockLesson>
    </Wrap>
  );
};
