import Blockly, { Workspace } from "blockly";

export interface BlocklyDemoProgram {
  title: string;
  description: string;
  xml: string;
}

/**
 * Use this to build a menu for selecting a predefined demo program and call loadPredefinedDemo() to load a demo program
 */
export const predefinedDemos: BlocklyDemoProgram[] = [
  {
    title: "Simple Demo",
    description: "Using 2 motors and a sensor",
    xml:
      '<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_repeat_ext" id="!5cKzxq7:By`Yx|*lXzC" x="43" y="54"><value name="TIMES"><block type="math_number" id="33@LxAi0Pf[ZW,[0.(=Z"><field name="NUM">100</field></block></value><statement name="DO"><block type="controls_if" id="u{s2gk%(5|!Boz^^z~X$"><mutation else="1"></mutation><value name="IF0"><block type="sensor_touch" id="*fd_Mq0~xp8Z(FmMHK:,"><field name="port">0</field></block></value><statement name="DO0"><block type="motor" id="9X7S6yz3L;/4=7I_:VQ1"><field name="port">0</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="5Sl;ci_gjzP@k$SB,|}Y"><field name="NUM">30</field></block></value><next><block type="motor" id="Ut^60l)jDG8yvy]-qWo,"><field name="port">1</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="4qhNTU4p^_A$,WCOFM.V"><field name="NUM">70</field></block></value></block></next></block></statement><statement name="ELSE"><block type="motor" id="MXDh1?k!T10~j#|1S7J="><field name="port">0</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="]:+9P*+%D}22hG-!g3d9"><field name="NUM">70</field></block></value><next><block type="motor" id="9(![ZWQII#:k!{=t1-r3"><field name="port">1</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="^F5U@_R*KCp:/1h1vHT7"><field name="NUM">30</field></block></value></block></next></block></statement></block></statement></block></xml>',
  },
  {
    title: "Gamepad Demo",
    description: "Program with gamepad controlling robot via blocks",
    xml:
      '<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_whileUntil" id="=}Ig/;9=6_ty3fX#oOM%" x="254" y="149"><field name="MODE">WHILE</field><value name="BOOL"><block type="logic_boolean" id="X}qMy)IFF3|y@VWPi,Pb"><field name="BOOL">TRUE</field></block></value><statement name="DO"><block type="controls_if" id="?26h*;ap%(Os)yoqL)c_"><mutation elseif="3" else="1"></mutation><value name="IF0"><block type="gamepad_getProperty_Boolean" id="xWCK,7_A17PzR@bO9c40"><field name="IDENTIFIER">gamepad1</field><field name="PROP">DpadLeft</field></block></value><statement name="DO0"><block type="motor" id="}=y$CVEx)l=[y_RS0zd@"><field name="port">0</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="w.ui}(^`jt?U~fP-IP[I"><field name="NUM">100</field></block></value><next><block type="motor" id="zxg#_l@yjw=.s%AQ.!$9"><field name="port">1</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="~gRsGL:x|k^f-/W.*qH7"><field name="NUM">100</field></block></value></block></next></block></statement><value name="IF1"><block type="gamepad_getProperty_Boolean" id="slIc}Q6^A06~JRYPEcN="><field name="IDENTIFIER">gamepad1</field><field name="PROP">DpadRight</field></block></value><statement name="DO1"><block type="motor" id="`c}E6%|0Vm,mDmA=k^n$"><field name="port">0</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="P?G[)G8+CNF@p*,,M9Am"><field name="NUM">100</field></block></value><next><block type="motor" id="{LjC50^t]d}ISIXQl{WF"><field name="port">1</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="k`8cvjCemmiQ$~t3I,}!"><field name="NUM">100</field></block></value></block></next></block></statement><value name="IF2"><block type="gamepad_getProperty_Boolean" id="!C96W)(#5u)Jv+Rdn+sI"><field name="IDENTIFIER">gamepad1</field><field name="PROP">DpadUp</field></block></value><statement name="DO2"><block type="motor" id="3qs`G.Y@I=bU=ZV~(%a7"><field name="port">0</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="WW)dVdxeEv}pV7N)ESxJ"><field name="NUM">100</field></block></value><next><block type="motor" id="?;=VOWAU/iFT35htB*`n"><field name="port">1</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="L^vmD`A#nx$|60PGL!Ds"><field name="NUM">100</field></block></value></block></next></block></statement><value name="IF3"><block type="gamepad_getProperty_Boolean" id="%_:]R]K]6)HhEX)dM/!j"><field name="IDENTIFIER">gamepad1</field><field name="PROP">DpadDown</field></block></value><statement name="DO3"><block type="motor" id="A21JeC=,|.x5lSBOpNhr"><field name="port">0</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="t]25e4}2q4;JvX}(hNeZ"><field name="NUM">100</field></block></value><next><block type="motor" id="s:oUUfc`/dD8s579#_pi"><field name="port">1</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="c}!!/wvb`aFV8;!)`0Y8"><field name="NUM">100</field></block></value></block></next></block></statement><statement name="ELSE"><block type="motor" id="F+HpIF/tqcYXZ;Kkb)yZ"><field name="port">0</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="%D.@-V#)DAZ!H0=Oa9S%"><field name="NUM">0</field></block></value><next><block type="motor" id="UkP?;HLgn$[T$+IS(/r`"><field name="port">1</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="CoOE=;Ot9S+vK%SQdq;w"><field name="NUM">0</field></block></value></block></next></block></statement></block></statement></block></xml>',
  },
];

export function loadPredefinedDemo(
  predefinedDemoId: number,
  workspace: Workspace
) {
  return build(predefinedDemos[predefinedDemoId].xml, workspace);
}

function build(xml: string, workspace: Workspace): void {
  const element = Blockly.Xml.textToDom(xml);
  Blockly.Xml.domToWorkspace(element, workspace);
}
