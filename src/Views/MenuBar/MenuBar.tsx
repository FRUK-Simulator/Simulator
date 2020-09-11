import React, { FunctionComponent } from "react";
import "./MenuBar.css";
import { VMControls } from "../../JavascriptVM/VMControls";
import { UserControls } from "./UserControls/UserControls";
import FIRSTLogo from "./FIRST_Horz_RGB.png";
import { useSelector, useDispatch } from "react-redux";
import {
  blocklySlice,
  getBlocklyPrograms,
} from "../../BlocklyInterface/blocklySlice";
import { getCurrentBlocklyCode } from "../../BlocklyInterface/BlocklyEditor";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  ISelectableOption,
} from "@fluentui/react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton } from "@fluentui/react";
import { AppDispatch } from "../../state/store";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const BlocklyProgramsDropdown: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const onProgramChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: ISelectableOption | undefined,
    index?: number | undefined
  ): void => {
    if (option && option.text) {
      dispatch(
        blocklySlice.actions.setActiveBlocklyProgramId({ title: option.text })
      );
    }
  };

  const programs = useSelector(getBlocklyPrograms);
  interface BlocklyProgramListItem {
    key: string;
    text: string;
    data?: { predefined: boolean };
    itemType?: DropdownMenuItemType;
  }
  const blocklyProgOptions: BlocklyProgramListItem[] = [];

  blocklyProgOptions.push({
    key: "predefinedKey",
    text: "Predefined programs",
    itemType: DropdownMenuItemType.Header,
  });
  for (const entry of programs) {
    if (!entry.predefined) continue;
    blocklyProgOptions.push({
      key: entry.title,
      text: entry.title,
      data: { predefined: entry.predefined },
    });
  }
  blocklyProgOptions.push({
    key: "userDefinedKey",
    text: "User-Defined programs",
    itemType: DropdownMenuItemType.Header,
  });
  for (const entry of programs) {
    if (entry.predefined) continue;
    blocklyProgOptions.push({
      key: entry.title,
      text: entry.title,
      data: { predefined: entry.predefined },
    });
  }

  const onRenderOption = (option?: ISelectableOption): JSX.Element => {
    const program_title: string = option && option.text ? option.text : "";

    let delete_button;
    if (option && option.data && option.data.predefined === false) {
      delete_button = (
        <DefaultButton
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              blocklySlice.actions.removeBlockyProgram({ title: option.text })
            );
          }}
          allowDisabledFocus
          disabled={false}
          iconProps={{ iconName: "PageRemove" }}
          className="delete-button"
        />
      );
    }

    return (
      <div className="flex-container">
        <span className="flex-container-item">{program_title}</span>
        {delete_button}
      </div>
    );
  };

  return (
    <Dropdown
      placeholder="Select options"
      options={blocklyProgOptions}
      styles={dropdownStyles}
      onChange={onProgramChange}
      onRenderOption={onRenderOption}
    />
  );
};

const BrandIcon = () => {
  return (
    <img src={FIRSTLogo} alt="FIRST Robotics" className="menu-bar--brand" />
  );
};

export const MenuBar: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [
    saveBlocklyProgramInputForm,
    setSaveBlocklyProgramInputForm,
  ] = React.useState("");
  const onChangesaveBlocklyProgramInputForm = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    setSaveBlocklyProgramInputForm(newValue || "");
  };

  return (
    <div className="menu-bar">
      <BrandIcon />
      <div className="buttons-container">
        <TextField
          placeholder="Program name"
          value={saveBlocklyProgramInputForm}
          onChange={onChangesaveBlocklyProgramInputForm}
        />
        <DefaultButton
          onClick={(e) => {
            const blocklyProgram = {
              title: saveBlocklyProgramInputForm,
              xml: getCurrentBlocklyCode(),
              predefined: false,
            };
            dispatch(
              blocklySlice.actions.addBlockyProgram({ prog: blocklyProgram })
            );

            dispatch(
              blocklySlice.actions.setActiveBlocklyProgramId({
                title: saveBlocklyProgramInputForm,
              })
            );

            setSaveBlocklyProgramInputForm("");
          }}
          allowDisabledFocus
          disabled={false}
          text="Save current program"
        />
        <BlocklyProgramsDropdown />
        <VMControls />
        <UserControls />
      </div>
    </div>
  );
};
