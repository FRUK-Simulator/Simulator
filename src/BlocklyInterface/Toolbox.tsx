import React, { forwardRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      xml: any;
      block: any;
    }
  }
}

export const Toolbox = forwardRef<HTMLElement, any>((props, ref) => {
  return (
    <xml ref={ref} className="toolbox">
      <block type="controls_if"></block>
      <block type="controls_repeat_ext"></block>
      <block type="logic_compare"></block>
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="text"></block>
      <block type="text_print"></block>
    </xml>
  );
});
