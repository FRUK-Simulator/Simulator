import Blockly from "blockly";
import "blockly/javascript";

declare interface BlocklyJavaScript {
  STATEMENT_PREFIX: string;
  addReservedWords(prefix: string): void;
  workspaceToCode(workspace: Blockly.WorkspaceSvg): string;
}

const BLOCKLY_HIGHLIGHT_PREFIX = "highlightBlock";

// Class wrapping blockly providing methods to directly access it. React/redux
// interaction is handled above this.
class BlocklyInstance {
  private workspace: Blockly.WorkspaceSvg;

  constructor(workspaceArea: HTMLDivElement, toolbox: HTMLElement) {
    this.workspace = Blockly.inject(workspaceArea, { toolbox });

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

  get generator() {
    return (Blockly as any).JavaScript as BlocklyJavaScript;
  }
}

export { BlocklyInstance };
