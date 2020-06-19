import { addDcMotorBlock } from "./DcMotor";

export default (() => {
  addDcMotorBlock();

  return `
<category name="Actuators">
    <block type="dc_motor"></block>
</category>
`;
})();
