import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { getCurrentBlocklyProgram } from "../../../BlocklyInterface/blocklySlice";
import marked from "marked";

export const DescriptionOverlay: FunctionComponent<{}> = () => {
  const currentProgram = useSelector(getCurrentBlocklyProgram);

  function getMarkdownText() {
    const rawMarkup = marked("This is _Markdown_.", { sanitize: true });

    return { __html: rawMarkup };
  }

  return <div dangerouslySetInnerHTML={getMarkdownText()} />;
};
