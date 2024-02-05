import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addDistanceSensorBlock() {
  addCustomBlock(
    "distance_sensor",
    [
      {
        type: "distance_sensor",
        lastDummyAlign0: "RIGHT",
        message0: "get distance from sensor  %1 on channel %2 %3 in %4 units",
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
            name: "unit",
            options: [
              ["cm", "centimeters"],
              ["m", "meters"],
            ],
          },
        ],
        output: "Number",
        colour: 300,
        tooltip: "Distance sensor",
        helpUrl: "",
      },
    ],
    (block) => {
      const numberChannel = block.getFieldValue("channel");
      const unitString = block.getFieldValue("unit");

      const code = `getSensorValue(${numberChannel}) * sensorConversionFactor("${unitString}")`;

      return [code, JavaScript.ORDER_ATOMIC];
    },
  );
}
