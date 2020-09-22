import { addColorEnumBlock } from "./EnumColor";

export default (() => {
  addColorEnumBlock();

  return `
<category name="Enums">
    <block type="color_enum"></block>
</category>
`;
})();
