import { addCustomBlock, JavaScript } from "../AddBlockUtil";

export function addColorEnumBlock() {
  addCustomBlock(
    "color_enum",
    [
      {
        type: "color_enum",
        lastDummyAlign0: "RIGHT",
        message0: "%1 ",
        args0: [
          {
            type: "field_dropdown",
            name: "color",
            options: [
              ["red", "red"],
              ["green", "green"],
              ["blue", "blue"],
            ],
          },
        ],
        output: "Number",
        colour: 230,
        tooltip: "Color Selector",
        helpUrl: "",
      },
    ],
    (block) => {
      const colorString = block.getFieldValue("color");
      const code = `colorSensorConversion("${colorString}")`;

      return [code, JavaScript.ORDER_ATOMIC];
    }
  );
}
