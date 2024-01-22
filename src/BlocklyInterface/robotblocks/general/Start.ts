import { addCustomBlock, JavaScript } from "../AddBlockUtil";

// code for wait block and VM-logic adopted from official blockly examples
// on https://groups.google.com/forum/#!topic/blockly/5xbDQ8FQzbI
export function addStartBlock() {
  addCustomBlock(
    "start_block",
    [
      {
        type: "start_block",
        message0: "Start %1 %2",
        args0: [
          { type: "input_dummy", name: "" },
          { type: "input_statement", name: "CODE" },
        ],
        colour: 60,
        tooltip: "This is where code is executed from the start",
        helpUrl: "",
      },
    ],
    (block) => {
      const code = JavaScript.statementToCode(block, "CODE");

      return `function start() { \n${code}\n}\n`;
    }
  );
}
