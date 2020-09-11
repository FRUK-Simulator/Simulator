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

    if (toFile) {
      this.exportToFile(blocklyProgram);
    } else {
      this.saveToLocalStorage(blocklyProgram);
    }
  }

  saveToLocalStorage(prog: Program) {
    this.dispatch(blocklySlice.actions.addBlockyProgram({ prog }));

    this.dispatch(
      blocklySlice.actions.setActiveBlocklyProgramId({
        title: prog.title,
      })
    );
  }

  exportToFile(program: Program) {
    const fakeLink = document.createElement("a");
    const file = new Blob([program.xml], { type: "application/xml" });
    fakeLink.href = URL.createObjectURL(file);
    fakeLink.download = `${program.title}.xml`;
    fakeLink.click();
  }
}
