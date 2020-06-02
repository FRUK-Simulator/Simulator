import Blockly from "blockly";
import JavaScript from "../node_modules/blockly/javascript";

const BLOCKLY_CONFIG: Blockly.BlocklyOptions = {
  toolbox: document.getElementById("toolbox"),
};

class BlocklyHandler {
  workspace: Blockly.WorkspaceSvg;

  constructor() {
    this.workspace = Blockly.inject("blocklyDiv", BLOCKLY_CONFIG);
    this.setupInterpretation();

    this.resizeBlockly();
    this.addListeners();
  }

  setupInterpretation() {
    JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
    JavaScript.addReservedWords("highlightBlock");
  }

  resizeBlockly() {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    const blocklyDiv = document.getElementById("blocklyDiv");
    const blocklyArea = document.getElementById("blocklyArea");

    let element = blocklyArea;
    let x = 0;
    let y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = <HTMLElement>element.offsetParent;
    } while (element);

    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + "px";
    blocklyDiv.style.top = y + "px";

    blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
    blocklyDiv.style.height = blocklyArea.offsetHeight + "px";

    Blockly.svgResize(this.workspace);
  }

  getCode() {
    return JavaScript.workspaceToCode(this.workspace);
  }

  highlightBlock(id) {
    return this.workspace.highlightBlock(id);
  }

  addListeners() {
    window.addEventListener("resize", this.resizeBlockly.bind(this), false);
  }
}

export { BlocklyHandler };
