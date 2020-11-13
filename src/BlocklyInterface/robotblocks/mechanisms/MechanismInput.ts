import { addCustomBlock } from "../AddBlockUtil";

export function addMechanismInputBlock() {
  addCustomBlock(
    "sendGrabberInput",
    [
      {
        type: "sendGrabberInput",
        message0: "Send grabber port %1 %2 value %3",
        args0: [
          {
            type: "field_number",
            name: "port",
            value: 0,
            min: 0,
          },
          {
            type: "input_dummy",
          },
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
      const portNumber = block.getFieldValue("port");
      const grabberValue = block.getFieldValue("value");

      return `setDigitalInput(${portNumber}, ${grabberValue});\n`;
    }
  );
}
