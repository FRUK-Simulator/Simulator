import { AppDispatch } from "../state/store";
import { getCurrentBlocklyCode } from "./BlocklyEditor";
import { blocklySlice } from "./blocklySlice";

export type Version = {
  major: number;
  minor: number;
  patch?: number;
};

export type Program = {
  title: string;
  description?: string;
  xml: string;
  predefined: boolean;
  version: Version;
};

export class BlocklyProgramSaver {
  constructor(private dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  save(title: string, toFile = false) {
    const blocklyProgram: Program = {
      title: title,
      xml: getCurrentBlocklyCode(),
      predefined: false,
      version: {
        major: 1,
        minor: 0,
      },
    };

    this.saveProgram(blocklyProgram, toFile);
  }

  saveProgram(program: Program, toFile = false) {
    if (toFile) {
      this.exportToFile(program);
    } else {
      this.saveToLocalStorage(program);
    }
  }

  saveToLocalStorage(prog: Program) {
    this.dispatch(blocklySlice.actions.addBlocklyProgram({ prog }));

    this.dispatch(
      blocklySlice.actions.setActiveBlocklyProgramId({
        title: prog.title,
      })
    );
  }

  exportToFile(program: Program) {
    const fakeLink = document.createElement("a");
    const file = new Blob([JSON.stringify(program)], {
      type: "application/json",
    });
    fakeLink.href = URL.createObjectURL(file);
    fakeLink.download = `${program.title}.json`;
    fakeLink.click();
  }
}
