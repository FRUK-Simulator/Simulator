import { addMotorBlock } from "./Motor";
import { addMotorCombinedBlock } from "./MotorCombined";

export default (() => {
  addMotorBlock();
  addMotorCombinedBlock();

  return `
<category name="Actuators">
    <block type="motor"></block>
    <block type="motor-combined"></block>
</category>
`;
})();
