import Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
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
]);

Blockly.JavaScript["dc_motor"] = function (block) {
  var number_port = block.getFieldValue("port");
  var dropdown_direction = block.getFieldValue("direction");
  var value_power = Blockly.JavaScript.valueToCode(
    block,
    "power",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  // convert direction to power sign +/-
  var isForward = dropdown_direction === "FORWARD";
  value_power *= isForward ? 1 : -1;
  var code = "setDcMotorPower(" + number_port + ", " + value_power + ")";
  return code;
};
