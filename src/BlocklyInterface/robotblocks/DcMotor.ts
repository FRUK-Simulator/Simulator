import { addCustomBlock, JavaScript } from "./AddBlockUtil";

export function addDcMotorBlock() {
  addCustomBlock(
    "dc_motor",
    [
      {
        type: "dc_motor",
        message0: "DC motor port %1 %2 direction %3 %4 set power to %% %5",
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
      var number_port = block.getFieldValue("port");
      var dropdown_direction = block.getFieldValue("direction");
      var value_power = JavaScript.valueToCode(
        block,
        "power",
        JavaScript.ORDER_ATOMIC
      );

      // convert direction to power sign +/-
      var isForward = dropdown_direction === "FORWARD";
      let sign = isForward ? "1" : "-1";
      var code = `setDcMotorPower(${number_port}, ${sign} * (${value_power}));\n`;
      return code;
    }
  );
}
