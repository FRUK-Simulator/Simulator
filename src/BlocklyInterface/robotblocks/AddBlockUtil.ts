import Blockly from "blockly";

type BlockCallback = (block: Blockly.Block) => (string | number)[] | string;

interface GamepadPropertyProcessor {
  (block: Blockly.Block): [String, number];
}

interface JavaScriptGenerator extends Blockly.Generator__Class {
  gamepad_getProperty?: GamepadPropertyProcessor;
  gamepad_getProperty_Number?: GamepadPropertyProcessor;
  gamepad_getProperty_Boolean?: GamepadPropertyProcessor;

  ORDER_FUNCTION_CALL: number;
  ORDER_ATOMIC: number;
}

export const JavaScript = (Blockly as any).JavaScript as JavaScriptGenerator;

export function addCustomBlock(
  blockName: string,
  block: Array<Object> | undefined,
  codeGenerator: BlockCallback
) {
  if (block) {
    Blockly.defineBlocksWithJsonArray(block);
  }

  (JavaScript as any)[blockName] = codeGenerator;
}
