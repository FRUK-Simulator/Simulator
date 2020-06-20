import { JavaScriptGenerator } from "../../@types/blockly-javascript";
import Blockly from "blockly";

type BlockCallback = (block: Blockly.Block) => [string, number] | string;

export const JavaScript = (Blockly as any).JavaScript as JavaScriptGenerator;

export function addCustomBlock(
  blockName: string,
  block: Array<Object>,
  codeGenerator: BlockCallback
) {
  Blockly.defineBlocksWithJsonArray(block);

  (JavaScript as any)[blockName] = codeGenerator;
}
