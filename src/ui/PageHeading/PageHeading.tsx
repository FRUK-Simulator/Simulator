import { forwardRef } from "react";
import styled from "styled-components";
import shapesPink1Url from "./shapes-pink-1.svg";
import shapesPink2Url from "./shapes-pink-2.svg";
import shapesBlue1Url from "./shapes-blue-1.svg";
import { H1, Subheading1, P } from "../../ui/Typography";

type BackgroundType = "pink-1" | "pink-2" | "blue-1";

const Wrap = styled.div<{
  $backgroundType: BackgroundType;
}>`
  padding: 80px 40% 80px 160px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  color: var(--color-white);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props) =>
    props.$backgroundType === "pink-1" &&
    `
    background-image: url(${(shapesPink1Url)});
    background-color: var(--color-red);
  `}
  
  ${(props) =>
    props.$backgroundType === "pink-2" &&
    `
    background-image: url(${(shapesPink2Url)});
    background-color: var(--color-red);
  `}

  ${(props) =>
    props.$backgroundType === "blue-1" &&
    `
    background-image: url(${(shapesBlue1Url)});
    background-color: var(--color-blue);
  `}
`;

const Subheading = styled(Subheading1)`
  opacity: 0.75;
  margin: 0;
`;

const Heading = styled(H1)`
  margin: 0;
`;

const Paragraph = styled(P)`
  padding: 0px 12% 0px 0px;
  line-height: 19.2px;
  margin: 0px;
  margin-top: 12px;
`;

type Props = {
  markerText: string;
  heading: string;
  description: string;
  backgroundType?: BackgroundType;
};

export const PageHeading = forwardRef<HTMLDivElement, Props>(
  ({ markerText, heading, description, backgroundType = "pink-1" }, ref) => {
    return (
      <Wrap
        $backgroundType={backgroundType}
        ref={ref}
      >
        <Subheading>&lt;{markerText}&gt;</Subheading>
        <Heading>{heading}</Heading>
        <Paragraph>{description}</Paragraph>
      </Wrap>
    );
  },
);
