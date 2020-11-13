import { addMechanismInputBlock } from "./MechanismInput";

export default (() => {
  addMechanismInputBlock();

  return `
<category name="Mechanisms">
    <block type="sendGrabberInput"></block>
</category>
`;
})();
