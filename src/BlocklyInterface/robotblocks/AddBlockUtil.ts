import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

type BlockCallback = (block: Blockly.Block) => (string | number)[] | string;

export const JavaScript = javascriptGenerator;

export function addCustomBlock(
  blockName: string,
  block: Array<object> | undefined,
  codeGenerator: BlockCallback,
) {
  if (block) {
    Blockly.defineBlocksWithJsonArray(block);
  }

  JavaScript.forBlock[blockName] = codeGenerator;
}
