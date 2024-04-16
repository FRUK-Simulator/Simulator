import { FC } from "react";
import styled from "styled-components";
import urlLessonBackgroundSvg from "./lesson-background.svg";
import urlGearSvg from "./gear.svg";
import { H3, Subheading2, P } from "../../ui/Typography";
import { Button } from "../../ui/Button";

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
  background-image: url(${urlLessonBackgroundSvg});
`;

const DivMascot = styled.div`
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

type MascotType = 1|2|3|4|5;
type Progress = 0|1|2|3

type Props = {
  lessonId: string;
  subtitle?: string;
  title: string;
  description: string;
  isResourcesCard?: boolean;
  mascotType: MascotType;
  progress: Progress;
};

const selectMascot = (mascotType: MascotType, progress: Progress) => {
  const headOpacity = Number(progress <= 2);
  const bodyOpacity = Number(progress <= 1);
  const legsOpacity = Number(progress <= 0);

  // TODO: add other mascots
  /*
  switch (mascotType) {
    case 1:
  */
      return (
        <svg data-progress={progress} xmlns="http://www.w3.org/2000/svg" id="Robot-1" viewBox="0 0 225.53 341.04">
          <g id="Head"><path fill="#102f42" d="M109.29 17.37h6.99v31.75h-6.99z"></path><circle cx="112.79" cy="11.77" r="11.77" fill="#438bfd" transform="rotate(-22.37 112.76 11.76)"></circle><path fill="#438bfd" d="M89.95 40.6h45.68c3.19 0 5.79 2.59 5.79 5.79v5.35H84.17v-5.35c0-3.19 2.59-5.79 5.79-5.79Z"></path><path fill="#184663" d="M109.29 24.7h6.99v1.26h-6.99zM109.29 31.01h6.99v1.26h-6.99zM109.29 37.32h6.99v1.26h-6.99z"></path><path fill="#003044" d="M46.06 80.23c-1.37 0-2.68.26-3.89.72a11.03 11.03 0 0 0-7.15 10.33v25.91c0 4.73 2.98 8.75 7.15 10.33 1.21.46 2.52.72 3.89.72h6.2v-48h-6.2ZM183.1 80.95c-1.21-.46-2.52-.72-3.89-.72h-6.2v48h6.2c1.37 0 2.68-.26 3.89-.72a11.03 11.03 0 0 0 7.15-10.33V91.27c0-4.73-2.98-8.75-7.15-10.33Z"></path><rect width="131.29" height="104.97" x="47.14" y="51.74" fill="#b7c5cd" rx="5.67" ry="5.67"></rect><path fill="#184663" d="M102.74 156.72h20.09v14.47h-20.09z"></path><path fill="#102f42" d="M102.74 156.72h20.09v3.61h-20.09zM89.95 163.68h45.68c3.19 0 5.79 2.59 5.79 5.79v1.73H84.17v-1.73c0-3.19 2.59-5.79 5.79-5.79Z"></path><rect width="14.17" height="94.73" x="56.59" y="56.91" fill="#cfd8de" rx="6.66" ry="6.66"></rect><path fill="#adbac2" d="M178.43 57.38v93.66c0 3.13-2.54 5.67-5.67 5.67h-42.98V51.74h43.56c2.86.29 5.09 2.71 5.09 5.64Z"></path><path fill="#5d9bfd" d="M112.78 19.55c-4.29 0-7.78-3.49-7.78-7.79a2.5 2.5 0 0 1 5 0c0 1.54 1.25 2.79 2.78 2.79a2.5 2.5 0 0 1 0 5Z"></path><rect width="120.51" height="47.63" x="52.53" y="84.8" fill="#102f42" rx="5.67" ry="5.67"></rect><path fill="#184663" d="M173.04 90.47c0-3.13-2.54-5.67-5.67-5.67H58.2c-3.13 0-5.67 2.54-5.67 5.67v18.14h120.51V90.47Z"></path><circle cx="92.01" cy="108.74" r="8.5" fill="#438bfd"></circle><circle cx="133.29" cy="108.61" r="8.5" fill="#438bfd"></circle></g>
          <path id="head-bg" opacity={headOpacity} fill="#fff" d="M183.1 80.95c-1.21-.46-2.52-.72-3.89-.72h-.78V57.35c0-.31-.03-.62-.09-.92a5.456 5.456 0 0 0-.25-.93 4.533 4.533 0 0 0-.4-.89c-.11-.2-.24-.39-.38-.58l-.18-.24c-.92-1.12-2.26-1.9-3.78-2.05h-31.93v-5.35c0-3.2-2.59-5.79-5.79-5.79h-19.34V23.01c4.79-1.49 8.27-5.96 8.27-11.24 0-6.5-5.27-11.77-11.77-11.77s-11.77 5.27-11.77 11.77c0 5.28 3.48 9.75 8.27 11.24v17.6H89.95c-3.2 0-5.79 2.59-5.79 5.79v5.35H52.81c-3.13 0-5.67 2.54-5.67 5.67v22.82h-1.08c-1.37 0-2.68.26-3.89.72a11.03 11.03 0 0 0-7.15 10.33v25.91c0 4.73 2.98 8.75 7.15 10.33 1.21.46 2.52.72 3.89.72h1.08v22.82c0 3.13 2.54 5.67 5.67 5.67h49.93v6.96H89.95c-3.2 0-5.79 2.59-5.79 5.79v1.73h57.25v-1.73c0-3.2-2.59-5.79-5.79-5.79h-12.79v-6.96h49.93c1 0 1.94-.26 2.76-.72a5.654 5.654 0 0 0 2.91-4.95v-22.82h.78c1.37 0 2.68-.26 3.89-.72a11.03 11.03 0 0 0 7.15-10.33V91.29c0-4.73-2.98-8.75-7.15-10.33Z"></path>

          <g id="Body"><rect width="130.46" height="113.57" x="47.56" y="171.18" fill="#b7c5cd" rx="5.67" ry="5.67"></rect><path fill="#102f42" d="M25.94 283.13H9.64c0-63.83 37.53-97.43 39.13-98.83l10.75 12.26-5.37-6.12 5.39 6.11c-.08.08-8.55 7.66-16.87 22.12-11.09 19.27-16.72 40.2-16.72 64.46Z"></path><path fill="#184663" d="m25.95 281.6-16.3-.18c.01-.96.03-1.92.06-2.86l16.29.47c-.02.85-.04 1.71-.05 2.57Zm2.17-22.94-16.04-2.91c.17-.95.35-1.9.54-2.83l15.98 3.23c-.17.83-.33 1.66-.48 2.51Zm6.11-22.11-15.25-5.76c.34-.91.69-1.8 1.04-2.68l15.13 6.06c-.31.78-.62 1.58-.93 2.38Zm10.04-20.58-13.91-8.5c.52-.84 1.03-1.66 1.54-2.46l13.72 8.81c-.45.7-.9 1.41-1.35 2.15Z"></path><circle cx="17" cy="284.74" r="17" fill="#438bfd"></circle><path fill="#adbac2" d="m178.01 185.45-.46-.43c.13.14.29.29.46.45v93.61c0 3.13-2.53 5.67-5.66 5.67h-42.57V171.19h42.57c3.13 0 5.66 2.53 5.66 5.67v8.59Z"></path><path fill="#102f42" d="M199.59 283.13h16.3c0-63.83-37.53-97.43-39.13-98.83l-10.75 12.26 5.37-6.12-5.39 6.11c.08.08 8.55 7.66 16.87 22.12 11.09 19.27 16.72 40.2 16.72 64.46Z"></path><path fill="#184663" d="m199.59 281.6 16.3-.18c-.01-.96-.03-1.92-.06-2.86l-16.29.47c.02.85.04 1.71.05 2.57Zm-2.17-22.94 16.04-2.91c-.17-.95-.35-1.9-.54-2.83l-15.98 3.23c.17.83.33 1.66.48 2.51Zm-6.11-22.11 15.25-5.76c-.34-.91-.69-1.8-1.04-2.68l-15.13 6.06c.31.78.62 1.58.93 2.38Zm-10.04-20.58 13.91-8.5c-.52-.84-1.03-1.66-1.54-2.46l-13.72 8.81c.45.7.9 1.41 1.35 2.15Z"></path><path fill="#5d9bfd" d="M17 297.61c-7.1 0-12.87-5.77-12.87-12.87 0-1.66 1.34-3 3-3s3 1.34 3 3c0 3.79 3.08 6.87 6.87 6.87 1.66 0 3 1.34 3 3s-1.34 3-3 3Z"></path><circle cx="208.53" cy="284.74" r="17" fill="#438bfd"></circle><path fill="#5d9bfd" d="M208.53 297.61c-7.1 0-12.87-5.77-12.87-12.87 0-1.66 1.34-3 3-3s3 1.34 3 3c0 3.79 3.08 6.87 6.87 6.87 1.66 0 3 1.34 3 3s-1.34 3-3 3Z"></path><path fill="#cfd8de" d="M63.25 233.72h.84c3.68 0 6.67 2.99 6.67 6.67v29.12c0 3.68-2.99 6.67-6.67 6.67h-.84c-3.68 0-6.67-2.99-6.67-6.67v-29.12c0-3.68 2.99-6.67 6.67-6.67Z"></path><circle cx="53.75" cy="190.19" r="20.05" fill="#438bfd"></circle><path fill="#5d9bfd" d="M53.75 204.83c-8.07 0-14.64-6.57-14.64-14.64 0-1.66 1.34-3 3-3s3 1.34 3 3c0 4.77 3.88 8.64 8.64 8.64 1.66 0 3 1.34 3 3s-1.34 3-3 3Z"></path><circle cx="174.72" cy="190.19" r="20.05" fill="#438bfd"></circle><path fill="#5d9bfd" d="M174.72 204.83c-8.07 0-14.64-6.57-14.64-14.64 0-1.66 1.34-3 3-3s3 1.34 3 3c0 4.77 3.88 8.64 8.64 8.64 1.66 0 3 1.34 3 3s-1.34 3-3 3Z"></path></g>
          <path id="body-bg" opacity={bodyOpacity} fill="#fff" d="M215.25 269.13c-2.76-30.95-14.21-53.61-23.94-67.69 2.18-3.21 3.46-7.08 3.46-11.25 0-11.07-8.98-20.05-20.05-20.05-2.23 0-4.36.38-6.36 1.05H60.11c-2-.67-4.14-1.05-6.36-1.05-11.07 0-20.05 8.98-20.05 20.05 0 3.23.78 6.26 2.13 8.96C25.8 213 13.19 236.44 10.28 269.13 4.24 271.74 0 277.74 0 284.74c0 9.39 7.61 17 17 17s17-7.61 17-17c0-5.88-2.99-11.06-7.53-14.12.35-4.08.88-8.07 1.57-11.98h.07c.15-.83.31-1.67.48-2.49l-.08-.02c1.35-6.78 3.23-13.3 5.64-19.61l.07.02c.3-.81.61-1.6.93-2.38l-.06-.02c2.15-5.29 4.66-10.44 7.56-15.47.54-.93 1.07-1.83 1.61-2.7.45-.73.9-1.45 1.35-2.14.66-1.02 1.3-1.99 1.95-2.93v68.18c0 3.13 2.54 5.67 5.67 5.67h119.12c.98 0 1.9-.25 2.71-.69.1-.05.19-.11.28-.17.06-.04.12-.07.18-.11.12-.08.23-.17.34-.25.03-.03.07-.05.1-.07.11-.09.21-.18.31-.28.03-.03.06-.06.1-.09.09-.09.17-.19.26-.29.03-.04.07-.08.11-.12.06-.07.1-.14.16-.21.06-.08.12-.15.17-.23.02-.02.03-.05.05-.07.58-.89.92-1.95.92-3.09v-68.13c.63.92 1.27 1.87 1.91 2.88.45.7.9 1.41 1.35 2.15.53.87 1.07 1.77 1.61 2.7 2.9 5.03 5.41 10.18 7.56 15.47l-.06.02c.31.78.62 1.58.93 2.38l.07-.02c2.41 6.31 4.29 12.83 5.64 19.61l-.08.02c.17.83.33 1.66.48 2.51h.07c.7 3.89 1.22 7.88 1.57 11.97-4.54 3.05-7.53 8.23-7.53 14.12 0 9.39 7.61 17 17 17s17-7.61 17-17c0-7-4.23-13.01-10.28-15.61Z"></path>

          <g id="Legs"><path fill="#102f42" d="M138 293.73c0 7.62-.24 15.82-.84 24.53-.51 7.3-4.18 13.68-9.63 17.81-1.24.95-2.58 1.78-4 2.47a24.47 24.47 0 0 1-8.47 2.4c-.75.06-1.52.1-2.29.1-.58 0-1.15-.02-1.71-.07-3-.2-5.85-.95-8.46-2.14-1.41-.65-2.75-1.43-4-2.33a24.575 24.575 0 0 1-10.22-18.31c-.53-7.72-.84-15.89-.84-24.46 0-2.91.04-5.91.12-8.99h50.22c.08 2.94.12 5.94.12 8.99Z"></path><path fill="#184663" d="M102.6 284.74v54.09c-1.41-.65-2.75-1.43-4-2.33v-51.76h4ZM115.06 284.74v56.2c-.75.06-1.52.1-2.29.1-.58 0-1.15-.02-1.71-.07v-56.23h4ZM127.53 284.74v51.33c-1.24.95-2.58 1.78-4 2.47v-53.8h4Z"></path></g>
          <path id="legs-bg" opacity={legsOpacity} fill="#fff" d="M137.88 284.74H87.66c-.08 3.08-.12 6.08-.12 8.99 0 8.57.31 16.74.84 24.46.53 7.59 4.45 14.18 10.22 18.31 1.25.9 2.59 1.68 4 2.33 2.61 1.19 5.46 1.94 8.46 2.14.56.05 1.13.07 1.71.07.77 0 1.54-.04 2.29-.1a24.47 24.47 0 0 0 8.47-2.4c1.42-.69 2.76-1.52 4-2.47a24.437 24.437 0 0 0 9.63-17.81c.6-8.71.84-16.91.84-24.53 0-3.05-.04-6.05-.12-8.99Z"></path>
        </svg>
      );
    /*
    case 2:
      return (
      );

    case 3:
      return (
      );

    case 4:
      return (
      );

    case 5:
    default:
      return (
      );
  }
  */
}

export const LessonCard: FC<Props> = ({
  lessonId,
  subtitle,
  title,
  description,
  isResourcesCard,
  mascotType,
  progress,
}) => {
  return (
    <Wrap>
      <BlockMascot $mascotType={mascotType}>
        <DivMascot>
          {selectMascot(mascotType, progress)}
        </DivMascot>
        <DivProgress>
          <img src={urlGearSvg} />
          <span>{progress}/3</span>
        </DivProgress>
      </BlockMascot>
      <BlockLesson>
        <LessonDetails>
          <Subheading>{subtitle}</Subheading>
          <Heading>{title}</Heading>
          <Paragraph>{description}</Paragraph>
          <StyledButton type="primary" to={lessonId}>
            {isResourcesCard ? "View Guidance" : "View Challenges"}
          </StyledButton>
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
