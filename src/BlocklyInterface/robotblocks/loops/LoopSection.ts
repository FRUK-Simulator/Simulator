import { addWaitBlock } from "./Wait";

export default (() => {
  addWaitBlock();

  return `
<category name="Loops">
    <block type="controls_repeat_ext"></block>
    <block type="wait"></block>
</category>
`;
})();
