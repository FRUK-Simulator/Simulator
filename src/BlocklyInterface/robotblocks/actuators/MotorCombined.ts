import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addMotorCombinedBlock() {
  addCustomBlock(
    "motor-combined",
    [
      {
        type: "motor-combined",
        message0:
          "Motor port %1 direction %2 set power %% %3 %4 Motor port %5 direction %6 set power %% %7",
        args0: [
          {
            type: "field_number",
            name: "a_port",
            value: 0,
            min: 0,
          },
          {
            type: "field_dropdown",
            name: "a_direction",
            options: [
              ["forward", "FORWARD"],
              ["backward", "BACKWARD"],
            ],
          },
          {
            type: "input_value",
            name: "a_power",
            check: "Number",
            align: "RIGHT",
          },
          { type: "dummy_input" },
          {
            type: "field_number",
            name: "b_port",
            value: 1,
            min: 0,
          },
          {
            type: "field_dropdown",
            name: "b_direction",
            options: [
              ["forward", "FORWARD"],
              ["backward", "BACKWARD"],
            ],
          },
          {
            type: "input_value",
            name: "b_power",
            check: "Number",
            align: "RIGHT",
          },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: 230,
        tooltip: "",
        helpUrl: "",
        inputsInline: false,
      },
    ],
    (block) => {
      let mot = (prefix: string) => {
        const numberPort = block.getFieldValue(prefix + "port");
        const dropdownDirection = block.getFieldValue(prefix + "direction");
        const valuePower = JavaScript.valueToCode(
          block,
          prefix + "power",
          JavaScript.ORDER_ATOMIC
        );

        // convert direction to power sign +/-
        const isForward = dropdownDirection === "FORWARD";
        const sign = isForward ? "1" : "-1";
        return `setMotorPower(${numberPort}, ${sign} * (${valuePower}));`;
      };

      return mot("a_") + "\n" + mot("b_") + "\n";
    }
  );
}
