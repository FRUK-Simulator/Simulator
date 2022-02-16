import React, { FunctionComponent } from "react";
import * as marked from "marked";
import "./MarkdownDisplay.css";

function buildMarkdownClasses(classes: string[], divider: boolean) {
  classes.push("markdown-display");

  if (divider) {
    classes.push("markdown-display--divider");
  }

  return classes.join(" ");
}

export const MarkdownDisplay: FunctionComponent<{
  markdown: string;
  divider?: boolean;
  classes?: string[];
}> = ({ markdown = "", divider = false, classes = [] }) => {
  function getMarkdownText() {
    const rawMarkup = marked.parse(markdown, {});

    return { __html: rawMarkup };
  }
  const markdownClasses = buildMarkdownClasses(classes, divider);

  return (
    <div
      className={markdownClasses}
      dangerouslySetInnerHTML={getMarkdownText()}
    />
  );
};
