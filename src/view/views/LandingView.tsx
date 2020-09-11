import React, { FunctionComponent } from "react";
import "./LandingView.css";
import { getChallengesPerArena } from "../../RobotSimulator/ChallengeConfigLoader";
import {
  Card,
  CardImage,
  CardTitle,
  CardBody,
} from "../components/Common/Card";
import placeholder from "../components/Header/FIRST_Horz_RGB.png";
import { Link } from "react-router-dom";

const LessonSection: FunctionComponent<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <div className="lesson-section">
      <h1 className="lesson-title">{title}</h1>
      <div className="lessons">{children}</div>
    </div>
  );
};

export const LandingView = () => {
  const lessons: Array<{
    title: string;
    challenges: Array<{ title: string }>;
  }> = [];

  getChallengesPerArena().forEach((lessonChallenges, lessonTitle) => {
    lessons.push({
      title: lessonTitle,
      challenges: lessonChallenges.map((challenge) => ({
        title: challenge.name,
      })),
    });
  });

  return (
    <div>
      {lessons.map((lesson) => (
        <LessonSection title={lesson.title}>
          {lesson.challenges.map((challenge) => (
            <Link
              to={`/lessons/${lesson.title}/challenges/${challenge.title}/`}
            >
              <Card>
                <CardImage src={placeholder} />
                <CardTitle title={challenge.title} as="h2" />
                <CardBody>Lorem Ipsum Text</CardBody>
              </Card>
            </Link>
          ))}
        </LessonSection>
      ))}
    </div>
  );
};
