import React from "react";
import { useParams } from "react-router-dom";
import { getChallengeFromURL } from "../../RobotSimulator/ChallengeConfigLoader";
import { Container } from "../components/Common/Container";
import { Divider } from "../components/Common/Divider";
import { Title } from "../components/Common/Title";
import { MarkdownDisplay } from "../components/Common/MarkdownDisplay";
import { IconName } from "../components/Common/Icon";
import { LinkButton } from "../components/Common/Button";
import "./ChallengeView.css";

export const ChallengeView = () => {
  const { lesson = "", challenge = "" } = useParams<{
    lesson: string;
    challenge: string;
  }>();

  const challengeDescriptions = getChallengeFromURL(lesson, challenge)
    ?.descriptions;
  const displayableDescription =
    challengeDescriptions?.markdown || challengeDescriptions?.short || "";

  return (
    <Container className="simulator-view--panel__main challenge-view">
      <div className="challenge-view--header">
        <LinkButton to="/" iconPosition="left" iconName={IconName.back}>
          Return To Challenges
        </LinkButton>
        <Title as="h2">Challenge Description</Title>
      </div>
      <Divider />
      <MarkdownDisplay
        markdown={displayableDescription}
        divider
        classes={["challenge-view--content"]}
      />
      <Divider />
      <div className="challenge-view--footer">
        {/*left for future content - lesson success/failure etc*/}
      </div>
    </Container>
  );
};
