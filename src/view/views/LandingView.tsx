import React, { FunctionComponent } from "react";
import "./LandingView.css";

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
  const lessons = [];

  return (
    <div>
      <LessonSection title="Level 1"></LessonSection>
    </div>
  );
};
