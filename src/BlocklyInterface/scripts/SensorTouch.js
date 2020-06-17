import Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "sensor_touch",
    message0: "Touch sensor port %1 pushed?",
    args0: [
      {
        type: "field_number",
        name: "port",
        value: 0,
        min: 0,
      },
    ],
    output: "Boolean",
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["sensor_touch"] = function (block) {
  var number_port = block.getFieldValue("port");

  var code = "isSensorTouchPushed(" + number_port + ")";
  return [code, Blockly.JavaScript.ORDER_ADDITION];
};
