import { FC } from "react";
import styled from "styled-components";
import urlLesson1MascotSvg from "./lesson-1-mascot.svg";
import urlLesson1MaskBodySvg from "./lesson-1-mask-body.svg";
import urlLesson1MaskHeadSvg from "./lesson-1-mask-head.svg";
import urlLesson1MaskLegsSvg from "./lesson-1-mask-legs.svg";
import urlLesson2MascotSvg from "./lesson-2-mascot.svg";
import urlLesson2MaskBodySvg from "./lesson-2-mask-body.svg";
import urlLesson2MaskHeadSvg from "./lesson-2-mask-head.svg";
import urlLesson2MaskLegsSvg from "./lesson-2-mask-legs.svg";
import urlLesson3MascotSvg from "./lesson-3-mascot.svg";
import urlLesson3MaskBodySvg from "./lesson-3-mask-body.svg";
import urlLesson3MaskHeadSvg from "./lesson-3-mask-head.svg";
import urlLesson3MaskLegsSvg from "./lesson-3-mask-legs.svg";
import urlLesson4MascotSvg from "./lesson-4-mascot.svg";
import urlLesson4MaskBodySvg from "./lesson-4-mask-body.svg";
import urlLesson4MaskHeadSvg from "./lesson-4-mask-head.svg";
import urlLesson4MaskLegsSvg from "./lesson-4-mask-legs.svg";
import urlLesson5MascotSvg from "./lesson-5-mascot.svg";
import urlLesson5MaskBodySvg from "./lesson-5-mask-body.svg";
import urlLesson5MaskHeadSvg from "./lesson-5-mask-head.svg";
import urlLesson5MaskLegsSvg from "./lesson-5-mask-legs.svg";
import urlLessonBackgroundSvg from "./lesson-background.svg";
import urlGearSvg from "./gear.svg";
import iconDownload from "../../ui/icon-download.svg";
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
  justify-content: space-between;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: var(--color-blue-dark);
  background-image: url(${urlLessonBackgroundSvg});
  overflow: hidden;
`;

const DivMascot = styled.div<{
  progress?: Progress;
}>`
  width: 60%;
  flex-shrink: 1;
  position: relative;

  & img {
    position: absolute;
    top: var(--spacing-large);
  }
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
  position: relative;
  bottom: var(--spacing-large);
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

const IconDownload = styled.img`
  margin-left: 10px;
  width: 18;
  height: 18;
`;

const selectMascot = (mascotType: MascotType, progress?: Progress) => {
  let maskHead = false;
  let maskBody = false;
  let maskLegs = false;
  if (progress) {
    const progressRatio = progress.completed / progress.total;
    maskHead = Boolean(progressRatio <= 2 / 3);
    maskBody = Boolean(progressRatio <= 1 / 3);
    maskLegs = Boolean(progressRatio <= 0 / 3);
  }

  let urlMascotSvg = "";
  let urlMaskHeadSvg = "";
  let urlMaskBodySvg = "";
  let urlMaskLegsSvg = "";
  switch (mascotType) {
    case 1:
      urlMascotSvg = urlLesson1MascotSvg;
      urlMaskHeadSvg = urlLesson1MaskHeadSvg;
      urlMaskBodySvg = urlLesson1MaskBodySvg;
      urlMaskLegsSvg = urlLesson1MaskLegsSvg;
      break;
    case 2:
      urlMascotSvg = urlLesson2MascotSvg;
      urlMaskHeadSvg = urlLesson2MaskHeadSvg;
      urlMaskBodySvg = urlLesson2MaskBodySvg;
      urlMaskLegsSvg = urlLesson2MaskLegsSvg;
      break;
    case 3:
      urlMascotSvg = urlLesson3MascotSvg;
      urlMaskHeadSvg = urlLesson3MaskHeadSvg;
      urlMaskBodySvg = urlLesson3MaskBodySvg;
      urlMaskLegsSvg = urlLesson3MaskLegsSvg;
      break;
    case 4:
      urlMascotSvg = urlLesson4MascotSvg;
      urlMaskHeadSvg = urlLesson4MaskHeadSvg;
      urlMaskBodySvg = urlLesson4MaskBodySvg;
      urlMaskLegsSvg = urlLesson4MaskLegsSvg;
      break;
    case 5:
    default:
      urlMascotSvg = urlLesson5MascotSvg;
      urlMaskHeadSvg = urlLesson5MaskHeadSvg;
      urlMaskBodySvg = urlLesson5MaskBodySvg;
      urlMaskLegsSvg = urlLesson5MaskLegsSvg;
      break;
  }

  return (
    <>
      <img src={urlMascotSvg} />
      {maskHead && <img src={urlMaskHeadSvg} />}
      {maskBody && <img src={urlMaskBodySvg} />}
      {maskLegs && <img src={urlMaskLegsSvg} />}
    </>
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
  buttonTextSecondary?: string;
  buttonDestSecondary?: string;
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
  buttonTextSecondary,
  buttonDestSecondary,
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

          {buttonTextSecondary && (
            <StyledButton
              type="secondary"
              to={buttonDestSecondary}
            >
              {buttonTextSecondary}
              <IconDownload src={iconDownload} />
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
