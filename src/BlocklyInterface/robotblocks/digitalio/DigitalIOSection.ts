import { addDigitalInputBlocks } from "./DigitalInput";
import { addDigitalOutputBlocks } from "./DigitalOutput";

export default (() => {
  addDigitalInputBlocks();
  addDigitalOutputBlocks();

  return `
<category name="Digital I/O">
    <block type="digitalInput"></block>
    <block type="digitalOutput"></block>
</category>
`;
})();
