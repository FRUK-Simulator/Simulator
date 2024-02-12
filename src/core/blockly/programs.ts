import Blockly, { Workspace } from "blockly";
import { Program } from "../../BlocklyInterface/ProgramExportImport";

export function getPredefinedBlocklyProgs(): Program[] {
  const arr = [] as Program[];
  for (const entry of predefinedDemos) {
    arr.push({
      title: entry.title,
      description: entry.description,
      xml: entry.xml,
      predefined: true,
      version: {
        major: 1,
        minor: 0,
        patch: 0,
      },
    });
  }
  return arr;
}

export interface BlocklyDemoProgram {
  title: string;
  description: string;
  xml: string;
}

export const newProgramXML =
  '<xml xmlns="https://developers.google.com/blockly/xml"><block type="start_block" id="2vki|qFYUp~wFEJ;5Q2t" x="67" y="212"><statement name="CODE"><block type="comment" id="9aWEa(k7D0kT0(pOom4]"><field name="COMMENT">New Program</field><next><block type="motor-combined" id="yA-O#W_s,Cr/)Aw;!XS,"><field name="a_port">0</field><field name="a_direction">FORWARD</field><field name="b_port">1</field><field name="b_direction">FORWARD</field><value name="a_power"><block type="math_number" id=")-US[ZMlL,Z_%rZ7T[?-"><field name="NUM">10</field></block></value><value name="b_power"><block type="math_number" id="**vB-WfsyLAyT|F5f[~G"><field name="NUM">10</field></block></value><next><block type="wait" id="7;NDWnT8%QIp}B}~`_Ul"><field name="wait">5</field></block></next></block></next></block></statement></block></xml>';

/**
 * Use this to build a menu for selecting a predefined demo program and call loadPredefinedDemo() to load a demo program
 */

export const predefinedDemos: BlocklyDemoProgram[] = [
  //
  {
    title: "Hello, Robot",
    description: "Minimal start program",
    xml: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="start_block" id="zmI$g`deBDCY1zM!,FD?" x="55" y="95"><statement name="CODE"><block type="controls_repeat_ext" id=")s):e,P6E|5QND@3wvb^"><value name="TIMES"><shadow type="math_number" id="_X4dYJP0;U]twjP4u;e`"><field name="NUM">10</field></shadow><block type="math_number" id="^M:+c}~=msUQMia(;4K0"><field name="NUM">3</field></block></value><statement name="DO"><block type="motor" id="Qhp$So%PG:pr8OSk`DId"><field name="port">0</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="+~R#3(L_Y,2Ne.u,;s+/"><field name="NUM">100</field></block></value></block></statement></block></statement></block></xml>',
  },
  {
    title: "Simple Demo",
    description: "Using 2 motors and a sensor",
    xml: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="start_block" id="+,`~P,M}WBAZ+ihq}MXK" x="56" y="87"><statement name="CODE"><block type="comment" id="bl5ug]4^~_lhkL.#lq`{"><field name="COMMENT">The Crazy Robot - JP</field><next><block type="controls_repeat_ext" id=")s):e,P6E|5QND@3wvb^"><value name="TIMES"><shadow type="math_number" id="_X4dYJP0;U]twjP4u;e`"><field name="NUM">10</field></shadow><block type="math_number" id="^M:+c}~=msUQMia(;4K0"><field name="NUM">10</field></block></value><statement name="DO"><block type="motor-combined" id="UYmc1Em$3BE!~jWI7nSF"><field name="a_port">0</field><field name="a_direction">FORWARD</field><field name="b_port">1</field><field name="b_direction">FORWARD</field><value name="a_power"><block type="math_number" id="=({tQr$0LeYi!vfbaf~["><field name="NUM">100</field></block></value><value name="b_power"><block type="math_number" id="8aB@TeTycz|k7|*X`w,E"><field name="NUM">100</field></block></value><next><block type="controls_whileUntil" id="*Q1p@rS.{EmG|r|]0[qq"><field name="MODE">WHILE</field><value name="BOOL"><block type="logic_compare" id="*HJaEPUDcZf-7U5~F[za"><field name="OP">GT</field><value name="A"><block type="distance_sensor" id=".z3-Aue-4gscd3D_o%NZ"><field name="channel">0</field><field name="unit">centimeters</field></block></value><value name="B"><block type="math_number" id="91gwH)P*x%cvK(KgO*qq"><field name="NUM">200</field></block></value></block></value><statement name="DO"><block type="wait" id=";T$%vgT3dL;`ATU(/Sf}"><field name="wait">0.25</field></block></statement><next><block type="motor" id="))qzzf1]H%gk|ih=1M88"><field name="port">0</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="g5C$7;HO+x3ujaTyt|Zn"><field name="NUM">100</field></block></value><next><block type="motor" id="rSG`{#3X8ThN+`-oiX:o"><field name="port">1</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="ds|SJe4JCH:C)g^QepXG"><field name="NUM">100</field></block></value><next><block type="controls_whileUntil" id="aUqw|qMA0!6ix09Zh^en"><field name="MODE">WHILE</field><value name="BOOL"><block type="logic_compare" id="b{)|].cXZ]p|8seonR^x"><field name="OP">LT</field><value name="A"><block type="distance_sensor" id="I}*.|tEWYA7Ec=eN7h9}"><field name="channel">0</field><field name="unit">centimeters</field></block></value><value name="B"><block type="math_number" id="%t%W#?Yq=XaH(S,1p.(T"><field name="NUM">400</field></block></value></block></value><statement name="DO"><block type="wait" id="q6S8/r[mv[Z8=5#46eug"><field name="wait">0.25</field></block></statement></block></next></block></next></block></next></block></next></block></statement></block></next></block></statement></block></xml>',
  },
  {
    title: "Gamepad Demo",
    description: "Program with gamepad controlling robot via blocks",
    xml: '<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="h8M}uYF(7%}={FaBqbAA">grabbbed</variable></variables><block type="start_block" id="oWw/gV]UAnFA!jK:ody`" x="65" y="-221"><statement name="CODE"><block type="variables_set" id="PVxaUGd3Rf#CLD-vT+Oe"><field name="VAR" id="h8M}uYF(7%}={FaBqbAA">grabbbed</field><value name="VALUE"><block type="logic_boolean" id="XTr^^bFv)z;bjqh1.mZj"><field name="BOOL">FALSE</field></block></value><next><block type="controls_whileUntil" id="=}Ig/;9=6_ty3fX#oOM%"><field name="MODE">WHILE</field><value name="BOOL"><block type="logic_boolean" id="X}qMy)IFF3|y@VWPi,Pb"><field name="BOOL">TRUE</field></block></value><statement name="DO"><block type="controls_if" id="?26h*;ap%(Os)yoqL)c_"><mutation elseif="3" else="1"></mutation><value name="IF0"><block type="gamepad_getProperty_Boolean" id="xWCK,7_A17PzR@bO9c40"><field name="IDENTIFIER">gamepad1</field><field name="PROP">DpadLeft</field></block></value><statement name="DO0"><block type="motor" id="}=y$CVEx)l=[y_RS0zd@"><field name="port">0</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="w.ui}(^`jt?U~fP-IP[I"><field name="NUM">100</field></block></value><next><block type="motor" id="zxg#_l@yjw=.s%AQ.!$9"><field name="port">1</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="~gRsGL:x|k^f-/W.*qH7"><field name="NUM">100</field></block></value></block></next></block></statement><value name="IF1"><block type="gamepad_getProperty_Boolean" id="slIc}Q6^A06~JRYPEcN="><field name="IDENTIFIER">gamepad1</field><field name="PROP">DpadRight</field></block></value><statement name="DO1"><block type="motor" id="`c}E6%|0Vm,mDmA=k^n$"><field name="port">0</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="P?G[)G8+CNF@p*,,M9Am"><field name="NUM">100</field></block></value><next><block type="motor" id="{LjC50^t]d}ISIXQl{WF"><field name="port">1</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="k`8cvjCemmiQ$~t3I,}!"><field name="NUM">100</field></block></value></block></next></block></statement><value name="IF2"><block type="gamepad_getProperty_Boolean" id="!C96W)(#5u)Jv+Rdn+sI"><field name="IDENTIFIER">gamepad1</field><field name="PROP">DpadUp</field></block></value><statement name="DO2"><block type="motor" id="3qs`G.Y@I=bU=ZV~(%a7"><field name="port">0</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="WW)dVdxeEv}pV7N)ESxJ"><field name="NUM">100</field></block></value><next><block type="motor" id="?;=VOWAU/iFT35htB*`n"><field name="port">1</field><field name="direction">FORWARD</field><value name="power"><block type="math_number" id="L^vmD`A#nx$|60PGL!Ds"><field name="NUM">100</field></block></value></block></next></block></statement><value name="IF3"><block type="gamepad_getProperty_Boolean" id="%_:]R]K]6)HhEX)dM/!j"><field name="IDENTIFIER">gamepad1</field><field name="PROP">DpadDown</field></block></value><statement name="DO3"><block type="motor" id="A21JeC=,|.x5lSBOpNhr"><field name="port">0</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="t]25e4}2q4;JvX}(hNeZ"><field name="NUM">100</field></block></value><next><block type="motor" id="s:oUUfc`/dD8s579#_pi"><field name="port">1</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="c}!!/wvb`aFV8;!)`0Y8"><field name="NUM">100</field></block></value></block></next></block></statement><statement name="ELSE"><block type="motor" id="F+HpIF/tqcYXZ;Kkb)yZ"><field name="port">0</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="%D.@-V#)DAZ!H0=Oa9S%"><field name="NUM">0</field></block></value><next><block type="motor" id="UkP?;HLgn$[T$+IS(/r`"><field name="port">1</field><field name="direction">BACKWARD</field><value name="power"><block type="math_number" id="CoOE=;Ot9S+vK%SQdq;w"><field name="NUM">0</field></block></value></block></next></block></statement><next><block type="comment" id="5hGrY[FrWR#wt|XecXJH"><field name="COMMENT">handle grabber</field><next><block type="controls_if" id="tnzWWCQ%uERjYfCPQQO:"><value name="IF0"><block type="gamepad_getProperty_Boolean" id="``dA}!]xM^:ib]GP=]/6"><field name="IDENTIFIER">gamepad1</field><field name="PROP">A</field></block></value><statement name="DO0"><block type="comment" id="BmqSS8APX1E8P[p~LbAd"><field name="COMMENT">check if we are currently grabbing..</field><next><block type="controls_if" id="tTfzkv3|z6*E@Or!GL?z"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare" id="o7C/%o5g$pnyz.n$OdH*"><field name="OP">EQ</field><value name="A"><block type="variables_get" id="Uv?z1U!?59W^dOt#=DRb"><field name="VAR" id="h8M}uYF(7%}={FaBqbAA">grabbbed</field></block></value><value name="B"><block type="logic_boolean" id="cA,+7$rN30PCHrDIw$tf"><field name="BOOL">TRUE</field></block></value></block></value><statement name="DO0"><block type="comment" id="wMK1(`r|?Q!{`M@P8Vmq"><field name="COMMENT">... if so, release</field><next><block type="variables_set" id="TefR}xaoS@byP/@l(5WK"><field name="VAR" id="h8M}uYF(7%}={FaBqbAA">grabbbed</field><value name="VALUE"><block type="logic_boolean" id="v(:CPX_k]6hrRlmWmyuM"><field name="BOOL">FALSE</field></block></value><next><block type="digitalInput" id="af%4l*e=:G@n=jlqb3(+"><field name="value">true</field><field name="channel">0</field></block></next></block></next></block></statement><statement name="ELSE"><block type="comment" id="j4i4=`L;0#bIO(WnYLtZ"><field name="COMMENT">... otherwise, begin grabbing</field><next><block type="variables_set" id="gdKq2wr2KP/j^u/SEUg`"><field name="VAR" id="h8M}uYF(7%}={FaBqbAA">grabbbed</field><value name="VALUE"><block type="logic_boolean" id="X2E(vw+qe(#l+Bt-#MnY"><field name="BOOL">TRUE</field></block></value><next><block type="digitalInput" id="6,NTx;B}hFA:=Uv3q/=0"><field name="value">false</field><field name="channel">0</field></block></next></block></next></block></statement><next><block type="comment" id="d_#J/@]D-w[o`)?F*sSE"><field name="COMMENT">now wait for user to release button</field><next><block type="controls_whileUntil" id=";Lx?Zb1d?IG+p!;xjs/V"><field name="MODE">WHILE</field><value name="BOOL"><block type="gamepad_getProperty_Boolean" id="VJSl{[un:4/@yrPBs`Y-"><field name="IDENTIFIER">gamepad1</field><field name="PROP">A</field></block></value><statement name="DO"><block type="wait" id="x0QmIEuZ27%0$!lNC)dl"><field name="wait">0</field></block></statement></block></next></block></next></block></next></block></statement></block></next></block></next></block></statement></block></next></block></statement></block></xml>',
  },
];

export function loadPredefinedDemo(
  predefinedDemoId: number,
  workspace: Workspace,
) {
  return build(predefinedDemos[predefinedDemoId].xml, workspace);
}

export function loadBlocklyXml(xml: string, workspace: Workspace) {
  build(xml, workspace);
}
function build(xml: string, workspace: Workspace): void {
  const element = Blockly.utils.xml.textToDom(xml);
  Blockly.Xml.domToWorkspace(element, workspace);
}

export function createNewProgram(): Program {
  return {
    description: "",
    predefined: false,
    title: "New Program",
    xml: newProgramXML,
    version: {
      major: 1,
      minor: 0,
      patch: 0,
    },
  };
}
