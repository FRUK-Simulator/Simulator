import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addColorSensorBlock() {
  addCustomBlock(
    "color_sensor",
    [
      {
        type: "color_sensor",
        lastDummyAlign0: "RIGHT",
        message0:
          "get whether color from sensor  %1 on channel %2 %3 matches %4",
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
          {
            type: "input_dummy",
            align: "RIGHT",
          },
          {
            type: "field_dropdown",
            name: "color",
            options: [
              ["red", "red"],
              ["blue", "blue"],
              ["green", "green"],
            ],
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
      const colorString = block.getFieldValue("color");
      const colorVal = convertColor(colorString);
      const code = `getSensorValue(${numberChannel}) == colorSensorConversion(${colorVal}")`;

      return [code, JavaScript.ORDER_ATOMIC];
    }
  );
}

function convertColor(color: string): number {
  if (color == "red") {
    return 0xff0000;
  }
  return 0;
}
