import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addGyroBlock() {
  addCustomBlock(
    "gyroscope_sensor",
    [
      {
        type: "gyroscope_sensor",
        lastDummyAlign0: "RIGHT",
        message0: "get rotation from sensor %1 on channel %2",
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
        tooltip: "gyroscope sensor",
        helpUrl: "",
      },
    ],
    (block) => {
      const numberChannel = block.getFieldValue("channel");
      const code = `getSensorValue(${numberChannel})`;

      return [code, JavaScript.ORDER_ATOMIC];
    },
  );
}
