import styled from "styled-components";
import { H3, P } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import { FC, useMemo } from "react";
import { Challenge } from "../../core/data-loader";
import { Spacer } from "../../ui/Spacer";

import blueprint1Url from "./blueprint-1.svg";
import blueprint2Url from "./blueprint-2.svg";
import blueprint3Url from "./blueprint-3.svg";
import { Gear } from "./Gear";

const Wrap = styled.div`
  flex-basis: 420px;
  min-height: 500px;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
`;

const Banner = styled.div<{ $bgUrl: string }>`
  background-image: url(${({ $bgUrl }) => $bgUrl});
  background-size: cover;
  background-color: #17435c;
  flex-basis: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BannerImage = styled.img`
  width: 120px;
`;

const ContentWrap = styled.div`
  padding: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-grow: 1;
`;

const Title = styled(H3)`
  margin-top: 0;
  margin-bottom: 0;
`;

const Paragraph = styled(P)`
  margin-top: 8px;
  margin-bottom: 16px;
`;

const PositionedGear = styled(Gear)`
  position: absolute;
  right: 16px;
  top: 16px;
`;

type Props = Challenge & {
  // TODO: figure out what does the top right corner gear icon represents
  // count: number;
};

export const ChallengeCard: FC<Props> = ({
  challengeId,
  title,
  description,
  iconUrl,
}) => {
  const bannerCoverUrl = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
      case 0:
        return blueprint1Url;
      case 1:
        return blueprint2Url;
      case 2:
        return blueprint3Url;
      default:
        return "";
    }
  }, []);

  // TODO: replace it with real count after talk to product people
  // to figure out what does it mean
  const fakeCount = useMemo(() => {
    return Math.floor(Math.random() * 3);
  }, []);

  return (
    <Wrap>
      <Banner $bgUrl={bannerCoverUrl}>
        <BannerImage src={iconUrl} alt="cover" />
        <PositionedGear count={fakeCount} />
      </Banner>
      <ContentWrap>
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
        <Spacer size={1} />
        <Button type="primary" to={`challenges/${challengeId}`}>
          LET'S GO!
        </Button>
      </ContentWrap>
    </Wrap>
  );
};
