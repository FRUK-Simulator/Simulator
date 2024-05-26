import { FC } from "react";
import styled from "styled-components";
import urlLessonBackgroundSvg from "./lesson-background.svg";
import { LessonCardMascot } from "./LessonCardMascot";
import urlGearSvg from "./gear.svg";
import { H3, Subheading2, P } from "../../ui/Typography";
import { Button } from "../../ui/Button";

const Wrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;

const BlockMascot = styled.div`
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
  background-image: url(${urlLessonBackgroundSvg});
`;

const DivMascot = styled.div<{
  progress?: Progress;
}>`
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
  & button {
    margin: 0 0 var(--spacing-medium) 0;
  }
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

const selectMascot = (mascotType: MascotType, progress?: Progress) => {
  const showHead = progress
    ? Boolean(3 / 3 <= progress.completed / progress.total)
    : true;
  const showBody = progress
    ? Boolean(2 / 3 <= progress.completed / progress.total)
    : true;
  const showLegs = progress
    ? Boolean(1 / 3 <= progress.completed / progress.total)
    : true;

  const i = LessonCardMascot[mascotType - 1]
    ? mascotType - 1
    : LessonCardMascot.length - 1;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={LessonCardMascot[i].viewBox}
    >
      {showHead ? LessonCardMascot[i].head : LessonCardMascot[i].headMask}
      {showBody ? LessonCardMascot[i].body : LessonCardMascot[i].bodyMask}
      {showLegs ? LessonCardMascot[i].legs : LessonCardMascot[i].legsMask}
    </svg>
  );
};

type MascotType = 1 | 2 | 3 | 4 | 5;
type Progress = {
  complete: number;
  total: number;
};

type Props = {
  mascotType: MascotType;
  progress?: Progress;
  subtitle?: string;
  title: string;
  description: string;
  buttonTextPrimary?: string;
  buttonDestPrimary?: string;
  buttonTextSecondaryDownload?: string;
  buttonDestSecondaryDownload?: string;
  buttonTextTertiary?: string;
  buttonDestTertiary?: string;
};

export const LessonCard: FC<Props> = ({
  mascotType,
  progress,
  subtitle,
  title,
  description,
  buttonTextPrimary,
  buttonDestPrimary,
  buttonTextSecondaryDownload,
  buttonDestSecondaryDownload,
  buttonTextTertiary,
  buttonDestTertiary,
}) => {
  return (
    <Wrap>
      <BlockMascot>
        <DivMascot>{selectMascot(mascotType, progress)}</DivMascot>
        {progress && (
          <DivProgress>
            <img src={urlGearSvg} />
            <span>
              {progress.completed}/{progress.total}
            </span>
          </DivProgress>
        )}
      </BlockMascot>

      <BlockLesson>
        <LessonDetails>
          <Subheading>{subtitle}</Subheading>
          <Heading>{title}</Heading>
          <Paragraph>{description}</Paragraph>

          {buttonTextPrimary && (
            <StyledButton type="primary" to={buttonDestPrimary}>
              {buttonTextPrimary}
            </StyledButton>
          )}

          {buttonTextSecondaryDownload && (
            <StyledButton
              type="secondary-download"
              to={buttonDestSecondaryDownload}
            >
              {buttonTextSecondaryDownload}
            </StyledButton>
          )}

          {buttonTextTertiary && (
            <>
              <Hr />
              <StyledButton type="tertiary" to={buttonDestTertiary}>
                {buttonTextTertiary}
              </StyledButton>
            </>
          )}
        </LessonDetails>
      </BlockLesson>
    </Wrap>
  );
};
