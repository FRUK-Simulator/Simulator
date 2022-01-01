import Blockly, { Events, BlockSvg } from "blockly";
import "blockly/javascript";
import { JavaScript } from "./robotblocks/AddBlockUtil";

export class BlocklyUiEvent extends Events.Ui {
  public element: string | undefined;
}

export type BlocklyEvent =
  | Events.BlockChange
  | Events.BlockMove
  | Events.Create
  | Events.Delete
  | BlocklyUiEvent;

export enum BlocklyEventName {
  BlockChange = "BlockChange",
  BlockMove = "BlockMove",
  BlockCreate = "BlockCreate",
  BlockDelete = "BlockDelete",
  Ui = "Ui",
}

export const BLOCKLY_HIGHLIGHT_PREFIX = "highlightBlock";

// Class wrapping blockly providing methods to directly access it. React/redux
// interaction is handled above this.
class BlocklyInstance {
  private workspace: Blockly.WorkspaceSvg;

  constructor(workspaceArea: HTMLDivElement, toolboxXml: string) {
    this.workspace = Blockly.inject(workspaceArea, {
      toolbox: toolboxXml,
    });

    this.setupInterpretation();
    this.resizeBlockly();
  }

  setupInterpretation() {
    JavaScript.INDENT = "  ";
    JavaScript.STATEMENT_PREFIX = `${BLOCKLY_HIGHLIGHT_PREFIX}(%1);\n`;
    JavaScript.addReservedWords(BLOCKLY_HIGHLIGHT_PREFIX);
  }

  resizeBlockly() {
    // Request blockly instance itself to resize based on it's wrapping area
    Blockly.svgResize(this.workspace);
  }

  getCode() {
    let starts = this.workspace.getBlocksByType("start_block", false);

    if (!starts || starts.length === 0) {
      return "// No start block found, try putting blocks into a start block\n// ERROR: NO_START_BLOCK!";
    }

    if (starts.length > 1) {
      return "// Multiple start blocks found, try putting blocks into a single start block\n// ERROR: MULTIPLE_START_BLOCKS!";
    }

    let start = starts[0];
    JavaScript.init(this.workspace);
    let code = JavaScript.blockToCode(start);
    if (typeof code !== "string") {
      throw Error("Bad return type");
    }

    return code;
  }

  highlightBlock(id: string) {
    return this.workspace.highlightBlock(id);
  }

  setMaxBlocks(maxBlocks: number) {
    this.workspace.options.maxBlocks = maxBlocks;
  }

  clearMaxBlocks() {
    this.workspace.options.maxBlocks = Infinity;
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
