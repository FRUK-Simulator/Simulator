import { addCustomBlock, JavaScript } from "./AddBlockUtil";

export function addSensorTouchBlock() {
  addCustomBlock(
    "sensor_touch",
    [
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
    ],
    (block) => {
      var number_port = block.getFieldValue("port");

      var code = `isSensorTouchPushed(${number_port})`;
      return [code, JavaScript.ORDER_ADDITION];
    }
  );
}
