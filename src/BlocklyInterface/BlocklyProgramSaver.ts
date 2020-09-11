import { getCurrentBlocklyCode } from "./BlocklyEditor";
import { blocklySlice } from "./blocklySlice";

declare type Program = {
  title: string;
  xml: string;
  predefined: boolean;
};

export class BlocklyProgramSaver {
  constructor(private dispatch: (a: any) => void) {
    this.dispatch = dispatch;
  }

  save(title: string, toFile = false) {
    const blocklyProgram: Program = {
      title: title,
      xml: getCurrentBlocklyCode(),
      predefined: false,
    };

    this.saveToLocalStorage(blocklyProgram);
  }

  saveToLocalStorage(prog: Program) {
    this.dispatch(blocklySlice.actions.addBlockyProgram({ prog }));
  }

  exportToFile(program: Program) {}
}
