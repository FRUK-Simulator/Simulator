import { addCustomBlock } from "../AddBlockUtil";

export function addMechanismInputBlock() {
  addCustomBlock(
    "sendGrabberInput",
    [
      {
        type: "sendGrabberInput",
        message0: "Send grabber value %1",
        args0: [
          {
            type: "field_dropdown",
            name: "value",
            options: [
              ["open", "true"],
              ["closed", "false"],
            ],
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

      return `setDigitalInput(0, ${grabberValue});\n`;
    }
  );
}
