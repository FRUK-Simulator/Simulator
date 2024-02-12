/*
 * Code taken and lightly modified from FTC Blockly application. Modifications
 * cover global variable usage from other files that are not suitable to be
 * directly copied across, or are themselves transpiled from unknown sources
 */

// The below lines are the additions to the FTC original general block
// definition to cover transpiled code parts
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

const functionColor = 289;
const commentColor = 200;

function createNonEditableField(label) {
  var field = new Blockly.FieldTextInput(label);
  field.CURSOR = "";
  field.showEditor_ = function () {};
  return field;
}

// FTC copied code begins here

Blockly.Blocks["comment"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput(""),
      "COMMENT",
    );
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(commentColor);
  },
};

javascriptGenerator.forBlock["comment"] = function (block) {
  return "// " + block.getFieldValue("COMMENT") + "\n";
};

Blockly.Blocks["misc_null"] = {
  init: function () {
    this.setOutput(true); // no type for null
    this.appendDummyInput().appendField(createNonEditableField("null"));
    this.setColour(functionColor);
    this.setTooltip("null");
  },
};

javascriptGenerator.forBlock["misc_null"] = function () {
  return ["null", javascriptGenerator.ORDER_ATOMIC];
};

Blockly.Blocks["misc_isNull"] = {
  init: function () {
    this.setOutput(true, "Boolean");
    this.appendDummyInput()
      .appendField("call")
      .appendField(createNonEditableField("isNull"));
    this.appendValueInput("VALUE") // all types allowed
      .appendField("value")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setColour(functionColor);
    this.setTooltip(
      "Returns true if the given value is null, false otherwise.",
    );
  },
};

javascriptGenerator.forBlock["misc_isNull"] = function (block) {
  var value = javascriptGenerator.valueToCode(
    block,
    "VALUE",
    javascriptGenerator.ORDER_EQUALITY,
  );
  var code = value + " === null";
  return [code, javascriptGenerator.ORDER_EQUALITY];
};

Blockly.Blocks["misc_isNotNull"] = {
  init: function () {
    this.setOutput(true, "Boolean");
    this.appendDummyInput()
      .appendField("call")
      .appendField(createNonEditableField("isNotNull"));
    this.appendValueInput("VALUE") // all types allowed
      .appendField("value")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setColour(functionColor);
    this.setTooltip(
      "Returns true if the given value is not null, false otherwise.",
    );
  },
};

javascriptGenerator.forBlock["misc_isNotNull"] = function (block) {
  var value = javascriptGenerator.valueToCode(
    block,
    "VALUE",
    javascriptGenerator.ORDER_EQUALITY,
  );
  var code = value + " !== null";
  return [code, javascriptGenerator.ORDER_EQUALITY];
};

Blockly.Blocks["misc_atan2"] = {
  init: function () {
    this.setOutput(true, "Number");
    this.appendDummyInput().appendField("atan2");
    this.appendValueInput("Y")
      .setCheck("Number")
      .appendField("y")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput("X")
      .setCheck("Number")
      .appendField("x")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setColour(Blockly.Msg.MATH_HUE);
    this.setTooltip(
      "Returns a numerical value between -180 and +180 degrees, representing " +
        "the counterclockwise angle between the positive X axis, and the point (x, y).",
    );
    this.getJavaScriptInputType = function (inputName) {
      switch (inputName) {
        case "Y":
        case "X":
          return "double";
        default:
          return "";
      }
    };
    this.getJavaScriptOutputType = function () {
      return "double";
    };
  },
};

javascriptGenerator.forBlock["misc_atan2"] = function (block) {
  var y = javascriptGenerator.valueToCode(
    block,
    "Y",
    javascriptGenerator.ORDER_COMMA,
  );
  var x = javascriptGenerator.valueToCode(
    block,
    "X",
    javascriptGenerator.ORDER_COMMA,
  );
  var code = "Math.atan2(" + y + ", " + x + ") / Math.PI * 180";
  return [code, javascriptGenerator.ORDER_DIVISION];
};

Blockly.Blocks["misc_addItemToList"] = {
  init: function () {
    this.appendDummyInput().appendField("add item");
    this.appendValueInput("ITEM");
    this.appendDummyInput().appendField("to list");
    this.appendValueInput("LIST").setCheck("Array");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Msg.LISTS_HUE);
    this.setTooltip("Add the item to the end of the list.");
  },
};

javascriptGenerator.forBlock["misc_addItemToList"] = function (block) {
  var item = javascriptGenerator.valueToCode(
    block,
    "ITEM",
    javascriptGenerator.ORDER_NONE,
  );
  var list = javascriptGenerator.valueToCode(
    block,
    "LIST",
    javascriptGenerator.ORDER_MEMBER,
  );
  return list + ".push(" + item + ")";
};
