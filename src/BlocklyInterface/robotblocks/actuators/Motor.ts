import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addMotorBlock() {
  addCustomBlock(
    "motor",
    [
      {
        type: "motor",
        message0: "Motor port %1 %2 direction %3 %4 set power to %% %5",
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
            name: "direction",
            options: [
              ["forward", "FORWARD"],
              ["backward", "BACKWARD"],
            ],
          },
          {
            type: "input_dummy",
          },
          {
            type: "input_value",
            name: "power",
            check: "Number",
            align: "RIGHT",
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
      const numberPort = block.getFieldValue("port");
      const dropdownDirection = block.getFieldValue("direction");
      const valuePower = JavaScript.valueToCode(
        block,
        "power",
        JavaScript.ORDER_ATOMIC
      );

      // convert direction to power sign +/-
      const isForward = dropdownDirection === "FORWARD";
      const sign = isForward ? "1" : "-1";
      return `setMotorPower(${numberPort}, ${sign} * (${valuePower}));\n`;
    }
  );
}
