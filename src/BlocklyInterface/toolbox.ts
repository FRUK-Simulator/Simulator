import { addDcMotorBlock } from "./robotblocks/DcMotor";
import { addSensorTouchBlock } from "./robotblocks/SensorTouch";

/**
 * Returns the XML for the Toolbox.
 */
export function getToolbox() {
  addDcMotorBlock();
  addSensorTouchBlock();

  return `
<xml>
    <block type="controls_if"></block>
    <block type="controls_repeat_ext"></block>
    <block type="logic_compare"></block>
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="text"></block>
    <block type="text_print"></block>
    <block type="dc_motor"></block>
    <block type="sensor_touch"></block>
</xml>`;
}
