import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addDigitalOutputBlocks() {
  addCustomBlock(
    "digitalOutput",
    [
      {
        type: "digitalOutput",
        message0: "Get digital input from channel %1 %2 value",
        lastDummyAlign0: "RIGHT",
        args0: [
          {
            type: "input_dummy",
            align: "RIGHT",
          },
          {
            type: "field_number",
            name: "channel",
            value: 0,
            min: 0,
            max: 20,
          },
        ],
        output: "Boolean",
        colour: 300,
        tooltip: "",
        helpUrl: "",
      },
    ],
    (block) => {
      const channelNumber = block.getFieldValue("channel");

      return [`getDigitalInput(${channelNumber})`, JavaScript.ORDER_ATOMIC];
    }
  );
}
