import { JavaScriptGenerator } from "../@types/blockly-javascript";
import Blockly, { Events, BlockSvg } from "blockly";
import "blockly/javascript";
import { getToolbox } from "./toolbox";

export class BlocklyUiEvent extends Events.Ui {
  public element: string | undefined;
}

declare interface BlocklyJavaScript {}

export type BlocklyEvent =
  | Events.BlockChange
  | Events.BlockMove
  | BlocklyUiEvent;

export enum BlocklyEventName {
  BlockChange = "BlockChange",
  BlockMove = "BlockMove",
  Ui = "Ui",
}

const BLOCKLY_HIGHLIGHT_PREFIX = "highlightBlock";

// Class wrapping blockly providing methods to directly access it. React/redux
// interaction is handled above this.
class BlocklyInstance {
  private workspace: Blockly.WorkspaceSvg;

  constructor(workspaceArea: HTMLDivElement) {
    this.workspace = Blockly.inject(workspaceArea, {
      toolbox: getToolbox(),
    });

    this.setupInterpretation();
    this.resizeBlockly();
  }

  setupInterpretation() {
    this.generator.STATEMENT_PREFIX = `${BLOCKLY_HIGHLIGHT_PREFIX}(%1);\n`;
    this.generator.addReservedWords(BLOCKLY_HIGHLIGHT_PREFIX);
  }

  resizeBlockly() {
    // Request blockly instance itself to resize based on it's wrapping area
    Blockly.svgResize(this.workspace);
  }

  getCode() {
    return this.generator.workspaceToCode(this.workspace);
  }

  highlightBlock(id: string) {
    return this.workspace.highlightBlock(id);
  }

  addChangeListener(
    eventName: BlocklyEventName,
    fn: (event: BlocklyEvent) => void
  ) {
    this.workspace.addChangeListener((event: BlocklyEvent) => {
      if (event instanceof Events[eventName]) {
        fn(event);
      }
    });
  }

  get generator() {
    return (Blockly as any).JavaScript as JavaScriptGenerator;
  }

  get selected() {
    return Blockly.selected?.id || "";
  }

  set selected(id) {
    if (id) {
      const block = this.workspace.getBlockById(id) as BlockSvg;

      if (block) {
        block.select();
      }
    } else {
      const block = Blockly.selected as BlockSvg;

      if (block) {
        block.unselect();
      }
    }
  }
}

export { BlocklyInstance };
