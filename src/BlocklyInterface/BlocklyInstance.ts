import Blockly from "blockly";
import "blockly/javascript";

declare interface BlocklyJavaScript {
  STATEMENT_PREFIX: string;
  addReservedWords: any;
  workspaceToCode: any;
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
    const generator = (Blockly as any).JavaScript as BlocklyJavaScript;

    generator.STATEMENT_PREFIX = `${BLOCKLY_HIGHLIGHT_PREFIX}(%1);\n`;
    generator.addReservedWords(BLOCKLY_HIGHLIGHT_PREFIX);
  }

  resizeBlockly() {
    // Request blockly instance itself to resize based on it's wrapping area
    Blockly.svgResize(this.workspace);
  }

  getCode() {
    const generator = (Blockly as any).JavaScript as BlocklyJavaScript;

    return generator.workspaceToCode(this.workspace);
  }

  highlightBlock(id: string) {
    return this.workspace.highlightBlock(id);
  }
}

export { BlocklyInstance };
