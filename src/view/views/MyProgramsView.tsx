import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BlocklyProgram } from "../../BlocklyInterface/BlocklyProgramLoader";
import {
  blocklySlice,
  getBlocklyPrograms,
} from "../../BlocklyInterface/blocklySlice";
import { Button, ButtonBar, ButtonVariant } from "../components/Common/Button";
import { Container } from "../components/Common/Container";
import { IconName } from "../components/Common/Icon";
import {
  List,
  ListItem,
  ListItemContent,
  ListItemHeader,
} from "../components/Common/List";
import "./MyProgramsView.css";

export const MyProgramsView = () => {
  const programs = useSelector(getBlocklyPrograms);
  const dispatch = useDispatch();
  const history = useHistory();

  const setProgramCallback = useCallback(
    (program: BlocklyProgram) => {
      dispatch(
        blocklySlice.actions.setActiveBlocklyProgramId({ title: program.title })
      );
      history.replace("?view=code");
    },
    [dispatch, history]
  );

  return (
    <>
      <Container className="simulator-view--panel__main">
        <h2 className="my-programs-heading">My Programs</h2>
        <Button
          variant={ButtonVariant.success}
          iconName={IconName.file}
          iconPosition="left"
        >
          New Program
        </Button>
        <List>
          {programs.map((program) => (
            <ListItem key={program.title}>
              <ListItemHeader as="h3" title={program.title} />
              <ListItemContent>
                There doesn't appear to be a description yet.
              </ListItemContent>
              <ButtonBar>
                <Button
                  onClick={setProgramCallback.bind(null, program)}
                  compact
                  iconName={IconName.load}
                  iconPosition="left"
                >
                  Load
                </Button>
                <Button
                  compact
                  iconName={IconName.download}
                  iconPosition="left"
                  disabled={true}
                  title="Not yet implemented..."
                >
                  Download
                </Button>
              </ButtonBar>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};
