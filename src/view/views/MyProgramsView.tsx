import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { useProgramDialog } from "../hooks/useProgramDialog";
import { useDeleteProgramDialog } from "../hooks/useDeleteProgramDialog";
import "./MyProgramsView.css";
import { messageSlice, MessageType } from "../../state/messagesSlice";
import {
  exportToFile,
  Program,
  importFromFile,
} from "../../BlocklyInterface/ProgramExportImport";

export const MyProgramsView = () => {
  const programs = useSelector(getBlocklyPrograms);
  const dispatch = useDispatch();
  const history = useHistory();

  const setProgramCallback = useCallback(
    (program: Program) => {
      dispatch(
        blocklySlice.actions.setActiveBlocklyProgramId({
          title: program.title,
        }),
      );

      // We need to load the blockly XML that is associated with the
      // selected 'program.title'.
      for (const entry of programs) {
        if (entry.title === program.title) {
          dispatch(
            blocklySlice.actions.setBlocklyXmlWorkspace({
              blocklyXmlWorkspace: entry.xml,
            }),
          );
          break;
        }
      }

      history.replace("?view=code");
    },
    [dispatch, history, programs],
  );

  const newProgramCallback = useProgramDialog("create");
  const deleteProgramCallback = useDeleteProgramDialog();
  const importCallback = useCallback(async () => {
    try {
      const program = await importFromFile();
      dispatch(blocklySlice.actions.addBlocklyProgram({ prog: program }));
    } catch (err) {
      dispatch(
        messageSlice.actions.addMessage({
          type: MessageType.danger,
          msg: err.message,
        }),
      );
    }
  }, [dispatch]);

  return (
    <>
      <Container className="simulator-view--panel__main my-programs-view">
        <div className="my-programs-view--btn-container">
          <ButtonBar>
            <Button
              variant={ButtonVariant.success}
              iconName={IconName.file}
              iconPosition="left"
              onClick={newProgramCallback}
            >
              New Program
            </Button>
            <Button
              variant={ButtonVariant.info}
              iconName={IconName.import}
              iconPosition="left"
              onClick={importCallback}
            >
              Import
            </Button>
          </ButtonBar>
        </div>
        <List>
          {programs.map((program) => (
            <ListItem key={program.title}>
              <ListItemHeader as="h3" title={program.title} />
              <ListItemContent>
                {program.description ||
                  "There doesn't seem to be a description for this program..."}
                <i>{program.predefined ? " (Sample Program)" : ""}</i>
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
                  onClick={exportToFile.bind(null, {
                    ...program,
                    predefined: false,
                  })}
                >
                  Download
                </Button>
                <Button
                  compact
                  iconName={IconName.exit}
                  iconPosition="left"
                  disabled={program.predefined}
                  variant={ButtonVariant.danger}
                  onClick={deleteProgramCallback.bind(null, program)}
                >
                  Delete
                </Button>
              </ButtonBar>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};
