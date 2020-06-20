import Blockly from "blockly";

export interface JavaScriptGenerator extends Blockly.Generator {
  ORDER_ADDITION: number;
  ORDER_ATOMIC: number;
  STATEMENT_PREFIX: string;
  addReservedWords(prefix: string): void;
  workspaceToCode(workspace: Blockly.WorkspaceSvg): string;
}
