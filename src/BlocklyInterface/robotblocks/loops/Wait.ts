import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addWaitBlock() {
  addCustomBlock(
    "wait",
    [
      {
        type: "wait",
        message0: "wait %1 seconds",
        args0: [
          {
            type: "field_number",
            name: "wait",
            value: 0,
            min: 0,
          },
        ],
        inputsInline: false,
        previousStatement: null,
        nextStatement: null,
        colour: 60,
        tooltip: "",
        helpUrl: "",
      },
    ],
    (block) => {
      const seconds = block.getFieldValue("wait");
      return `wait(${seconds * 1000});\n`;
    }
  );
}
