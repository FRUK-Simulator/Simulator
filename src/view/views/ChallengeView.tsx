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
import { useSelector } from "react-redux";
import {
  ChallengeInfo,
  ChallengeStatus,
  getChallengeInfo,
} from "../../RobotSimulator/Arenas/challengeSlice";

function statusStringRep(info?: ChallengeInfo): string {
  if (info === undefined) return "Pending";

  const status = info.status;
  if (status === ChallengeStatus.Pending) return "Pending";
  else if (status === ChallengeStatus.Success) return "Success";
  else return "Failure";
}

export const ChallengeView = () => {
  const { lesson = "", challenge = "" } = useParams<{
    lesson: string;
    challenge: string;
  }>();

  const challengeResults = useSelector(getChallengeInfo);
  const challengeDescriptions = getChallengeFromURL(lesson, challenge)
    ?.descriptions;
  const displayableDescription =
    challengeDescriptions?.markdown || challengeDescriptions?.short || "";

  return (
    <Container className="simulator-view--panel__main challenge-view">
      <div className="challenge-view--header">
        <Title as="h2">Challenge Description</Title>
      </div>
      <Divider />
      <MarkdownDisplay
        markdown={displayableDescription}
        classes={["challenge-view--content"]}
      />
      <div className="challenge-view--header">
        <Title as="h2">
          {"Challenge Status: " +
            statusStringRep(challengeResults.find((e) => e.id === challenge))}
        </Title>
      </div>
      <div className="challenge-view--statuster">
        <LinkButton to="/" iconPosition="left" iconName={IconName.back}>
          All Challenges
        </LinkButton>
      </div>
    </Container>
  );
};
