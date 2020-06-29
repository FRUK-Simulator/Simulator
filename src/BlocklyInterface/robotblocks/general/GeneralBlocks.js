/*
 * Code taken and lightly modified from FTC Blockly application. Modifications
 * cover global variable usage from other files that are not suitable to be
 * directly copied across, or are themselves transpiled from unknown sources
 */

// The below lines are the additions to the FTC original general block
// definition to cover transpiled code parts
import Blockly from "blockly";
const functionColor = 289;
const commentColor = 200;

function createNonEditableField(label) {
  var field = new Blockly.FieldTextInput(label);
  field.CURSOR = "";
  field.showEditor_ = function (opt_quietInput) {};
  return field;
}

// FTC copied code begins here

Blockly.Blocks["comment"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput(""),
      "COMMENT"
    );
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(commentColor);
  },
};

Blockly.JavaScript["comment"] = function (block) {
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

Blockly.JavaScript["misc_null"] = function (block) {
  return ["null", Blockly.JavaScript.ORDER_ATOMIC];
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
      "Returns true if the given value is null, false otherwise."
    );
  },
};

Blockly.JavaScript["misc_isNull"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(
    block,
    "VALUE",
    Blockly.JavaScript.ORDER_EQUALITY
  );
  var code = value + " === null";
  return [code, Blockly.JavaScript.ORDER_EQUALITY];
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
      "Returns true if the given value is not null, false otherwise."
    );
  },
};

Blockly.JavaScript["misc_isNotNull"] = function (block) {
  var value = Blockly.JavaScript.valueToCode(
    block,
    "VALUE",
    Blockly.JavaScript.ORDER_EQUALITY
  );
  var code = value + " !== null";
  return [code, Blockly.JavaScript.ORDER_EQUALITY];
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
        "the counterclockwise angle between the positive X axis, and the point (x, y)."
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

Blockly.JavaScript["misc_atan2"] = function (block) {
  var y = Blockly.JavaScript.valueToCode(
    block,
    "Y",
    Blockly.JavaScript.ORDER_COMMA
  );
  var x = Blockly.JavaScript.valueToCode(
    block,
    "X",
    Blockly.JavaScript.ORDER_COMMA
  );
  var code = "Math.atan2(" + y + ", " + x + ") / Math.PI * 180";
  return [code, Blockly.JavaScript.ORDER_DIVISION];
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

Blockly.JavaScript["misc_addItemToList"] = function (block) {
  var item = Blockly.JavaScript.valueToCode(
    block,
    "ITEM",
    Blockly.JavaScript.ORDER_NONE
  );
  var list = Blockly.JavaScript.valueToCode(
    block,
    "LIST",
    Blockly.JavaScript.ORDER_MEMBER
  );
  return list + ".push(" + item + ")";
};
