import { addCustomBlock } from "../AddBlockUtil";

export function addDigitalOutputBlocks() {
  addCustomBlock(
    "digitalOutput",
    [
      {
        type: "digitalOutput",
        message0: "get digital channel %1 output",
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
        output: "Number",
        colour: 300,
        tooltip: "Color sensor",
        helpUrl: "",
      },
    ],
    (block) => {
      const channelNumber = block.getFieldValue("channel");

      return `getDigitalOutput(${channelNumber})`;
    }
  );
}
