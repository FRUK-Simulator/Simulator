import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addColorSensorBlock() {
  addCustomBlock(
    "color_sensor",
    [
      {
        type: "color_sensor",
        lastDummyAlign0: "RIGHT",
        message0: "get color from sensor %1 on channel %2",
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
      const numberChannel = block.getFieldValue("channel");
      const code = `getComplexSensorValue(${numberChannel}, "ColorSensor").color`;

      return [code, JavaScript.ORDER_ATOMIC];
    },
  );
}
