import { addMotorBlock } from "./Motor";

export default (() => {
  addMotorBlock();

  return `
<category name="Actuators">
    <block type="motor"></block>
</category>
`;
})();
