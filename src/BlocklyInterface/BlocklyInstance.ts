import "blockly/javascript";
import Blockly, { Events } from "blockly";
import { JavaScript } from "./robotblocks/AddBlockUtil";

export const BlocklyUiEvent = Events.UiBase;

export type BlocklyEvent =
  | Events.BlockChange
  | Events.BlockMove
  | Events.BlockCreate
  | Events.BlockDelete
  | Events.Selected;

export type BlocklyEventName =
  | "BlockChange"
  | "BlockMove"
  | "BlockCreate"
  | "BlockDelete"
  | "Selected";

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
    JavaScript.init(this.workspace);
    // any functions or variables defined wil be stored up until finish is called.

    const starts = this.workspace.getBlocksByType("start_block", false);
    const functions = [
      ...this.workspace.getBlocksByType("procedures_defreturn", false),
      ...this.workspace.getBlocksByType("procedures_defnoreturn", false),
    ];
    if (!starts || starts.length === 0) {
      return "// No start block found, try putting blocks into a start block\n// ERROR: NO_START_BLOCK!";
    }

    if (starts.length > 1) {
      return "// Multiple start blocks found, try putting blocks into a single start block\n// ERROR: MULTIPLE_START_BLOCKS!";
    }

    const blocks = [starts[0], ...functions];

    JavaScript.init(this.workspace);

    let code = "";

    for (const block of blocks) {
      // If these blocks are function definitions then they wont generate code here, but instead add a definition which will be emitted in finish.
      const block_code = JavaScript.blockToCode(block);
      console.log(block_code);
      code += block_code + "\n";
    }
    if (typeof code !== "string") {
      throw Error("Bad return type");
    }

    // Call finish to adapt the curent code with any definitions we have pending.
    code = JavaScript.finish(code);

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
    fn: (event: BlocklyEvent) => void,
  ) {
    this.workspace.addChangeListener((event) => {
      if (event instanceof Events[eventName]) {
        fn(event);
      }
    });
  }

  get selected() {
    return Blockly.getSelected()?.id || "";
  }

  set selected(id) {
    if (id) {
      const block = this.workspace.getBlockById(id);

      if (block) {
        block.select();
      }
    } else {
      const block = Blockly.getSelected();

      if (block) {
        block.unselect();
      }
    }
  }
}

export { BlocklyInstance };

/**
 * Return the BlocklyInstance's current block tree as a
 * XML-formatted string.
 */
export function getCurrentBlocklyInstanceCode(): string {
  const xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
  const xml_text = Blockly.Xml.domToText(xml);
  return xml_text;
}
