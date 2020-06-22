import Blockly, { Workspace } from "blockly";

export class StdProgramBuilder {
  workspace: Workspace;

  constructor(workspace: Workspace) {
    this.workspace = workspace;
  }

  build(): void {
    const xml =
      '<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_repeat_ext" id="!5cKzxq7:By`Yx|*lXzC" x="43" y="54"><value name="TIMES"><block type="math_number" id="33@LxAi0Pf[ZW,[0.(=Z"><field name="NUM">100</field></block></value><statement name="DO"><block type="controls_if" id="u{s2gk%(5|!Boz^^z~X$"><mutation else="1"></mutation><value name="IF0"><block type="sensor_touch" id="*fd_Mq0~xp8Z(FmMHK:,"><field name="port">0</field></block></value><statement name="DO0"><block type="motor" id="9X7S6yz3L;/4=7I_:VQ1"><field name="port">0</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="5Sl;ci_gjzP@k$SB,|}Y"><field name="NUM">30</field></block></value><next><block type="motor" id="Ut^60l)jDG8yvy]-qWo,"><field name="port">1</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="4qhNTU4p^_A$,WCOFM.V"><field name="NUM">70</field></block></value></block></next></block></statement><statement name="ELSE"><block type="motor" id="MXDh1?k!T10~j#|1S7J="><field name="port">0</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="]:+9P*+%D}22hG-!g3d9"><field name="NUM">70</field></block></value><next><block type="motor" id="9(![ZWQII#:k!{=t1-r3"><field name="port">1</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="^F5U@_R*KCp:/1h1vHT7"><field name="NUM">30</field></block></value></block></next></block></statement></block></statement></block></xml>';
    const element = Blockly.Xml.textToDom(xml);
    Blockly.Xml.domToWorkspace(element, this.workspace);
  }
}
