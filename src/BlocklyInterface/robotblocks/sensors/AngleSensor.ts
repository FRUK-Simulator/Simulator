import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addAngleSensorBlock() {
  addCustomBlock(
    "angle_sensor",
    [
      {
        type: "angle_sensor",
        lastDummyAlign0: "RIGHT",
        message0: "get the angle ",
        output: "Number",
        colour: 300,
        tooltip: "angle sensor",
        helpUrl: "",
      },
    ],
    (block) => {
      const code = `getAngleValue()`;

      return [code, JavaScript.ORDER_ATOMIC];
    }
  );
}
