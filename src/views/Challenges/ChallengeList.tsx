import styled from "styled-components";
import { ChallengeCard } from "../../components/ChallengeCard/ChallengeCard";
import { FC } from "react";
import { Challenge } from "../../core/data-loader";

const Wrap = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

type Props = {
  challenges: Challenge[];
};

export const ChallengeList: FC<Props> = ({ challenges }) => {
  return (
    <Wrap>
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.challengeId} {...challenge} />
      ))}
    </Wrap>
  );
};
