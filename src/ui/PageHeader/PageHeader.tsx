import { FC } from "react";
import styled from "styled-components";
import shapesPink1Url from "./shapes-pink-1.svg";
import shapesPink2Url from "./shapes-pink-2.svg";
import shapesBlue1Url from "./shapes-blue-1.svg";
import { H1, Subheading1, P } from "../Typography";

type BackgroundType = "pink-1" | "pink-2" | "blue-1";

const Wrap = styled.div<{
  $backgroundType: BackgroundType;
}>`
  padding: 80px 0 80px 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-evenly;
  color: var(--color-white);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${(props) =>
    props.$backgroundType === "pink-1" &&
    `
    background-image: url(${shapesPink1Url});
    background-color: var(--color-red);
  `}

  ${(props) =>
    props.$backgroundType === "pink-2" &&
    `
    background-image: url(${shapesPink2Url});
    background-color: var(--color-red);
  `}

  ${(props) =>
    props.$backgroundType === "blue-1" &&
    `
    background-image: url(${shapesBlue1Url});
    background-color: var(--color-blue);
  `}
`;

const BlockHeader = styled.div`
  flex-grow: 3;
  flex-basis: 0;
`;

const BlockSpacer = styled.div`
  flex-grow: 2;
  flex-basis: 0;
`;

const Header = styled.div`
  padding-left: 18%;
  padding-right: 2%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
`;

const Subheading = styled(Subheading1)`
  opacity: 0.75;
  margin: 0;
`;

const Heading = styled(H1)`
  margin: 0;
`;

const Paragraph = styled(P)`
  padding: 0 12% 0px 0px;
  line-height: 19.2px;
  margin: 12px 0 0 0;
`;

type Props = {
  markerText: string;
  heading: string;
  description: string;
  backgroundType?: BackgroundType;
};

export const PageHeader: FC<Props> =
  ({ markerText, heading, description, backgroundType = "pink-1" }) => {
    return (
      <Wrap $backgroundType={backgroundType}>
        <BlockHeader>
          <Header>
            <Subheading>&lt;{markerText}&gt;</Subheading>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
          </Header>
        </BlockHeader>
        <BlockSpacer />
      </Wrap>
    );
  };
