import { addCustomBlock } from "../AddBlockUtil";

export function addDigitalInputBlocks() {
  addCustomBlock(
    "digitalInput",
    [
      {
        type: "digitalInput",
        message0: "Send %1%2 targeting digital input channel %3",
        args0: [
          {
            type: "field_dropdown",
            name: "value",
            options: [
              ["on", "true"],
              ["off", "false"],
            ],
          },
          {
            type: "input_dummy",
          },
          {
            type: "field_number",
            name: "channel",
            value: 0,
            min: 0,
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 230,
        tooltip: "",
        helpUrl: "",
      },
    ],
    (block) => {
      const grabberValue = block.getFieldValue("value");
      const channelNumber = block.getFieldValue("channel");

      return `setDigitalInput(${channelNumber}, ${grabberValue});\n`;
    }
  );
}
