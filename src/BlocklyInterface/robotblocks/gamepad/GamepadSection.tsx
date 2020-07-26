import { addGamepadBlocks } from "./GamepadBlocks";

export default (() => {
  addGamepadBlocks();

  return `
<category name="Gamepad">
    <block type="gamepad_getProperty_Boolean">
      <field name="IDENTIFIER">gamepad</field>
      <field name="PROP">A</field>
    </block>
    <block type="gamepad_getProperty_Boolean">
      <field name="IDENTIFIER">gamepad</field>
      <field name="PROP">B</field>
    </block>
    <block type="gamepad_getProperty_Boolean">
      <field name="IDENTIFIER">gamepad</field>
      <field name="PROP">X</field>
    </block>
    <block type="gamepad_getProperty_Boolean">
      <field name="IDENTIFIER">gamepad</field>
      <field name="PROP">Y</field>
    </block>
    <block type="gamepad_getProperty_Boolean">
      <field name="IDENTIFIER">gamepad</field>
      <field name="PROP">DpadUp</field>
    </block>
    <block type="gamepad_getProperty_Boolean">
      <field name="IDENTIFIER">gamepad</field>
      <field name="PROP">DpadDown</field>
    </block>
    <block type="gamepad_getProperty_Boolean">
      <field name="IDENTIFIER">gamepad</field>
      <field name="PROP">DpadLeft</field>
    </block>
    <block type="gamepad_getProperty_Boolean">
      <field name="IDENTIFIER">gamepad</field>
      <field name="PROP">DpadRight</field>
    </block>
  </category>
`;
})();
