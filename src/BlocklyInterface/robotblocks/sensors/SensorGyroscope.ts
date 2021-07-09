import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addGyroBlock() {
  addCustomBlock(
    "gyroscope",
    [
      {
        type: "gyroscope",
        lastDummyAlign0: "RIGHT",
        message0: "read Gyroscope",
        output: "Number",
        colour: 300,
        tooltip: "Read the robot's Gyroscope value",
        helpUrl: "",
      },
    ],
    (block) => {
      const code = `getGyroscopeValue()`;

      return [code, JavaScript.ORDER_ATOMIC];
    }
  );
}
