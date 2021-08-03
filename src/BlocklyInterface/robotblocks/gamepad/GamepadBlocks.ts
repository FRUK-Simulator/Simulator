import Blockly from "blockly";
import { addCustomBlock, JavaScript } from "../AddBlockUtil";

interface GamepadBlock {
  init(): void;
  setOutput?(arg0: boolean, arg1?: string): void;
  appendDummyInput?(): void;
  setColour?(arg0: number): void;
}

export function addGamepadBlocks() {
  // File pulled from ftc-blockly implementation. Lightly edited to include
  // types and pass our linting.
  // original author lizlooney@google.com (Liz Looney)

  // The following are pulled from other locations in the ftc-blockly repo:
  // getPropertyColor
  const getPropertyColor = 151;

  function createGamepadDropdown() {
    var CHOICES = [["gamepad1", "gamepad1"]];
    return new Blockly.FieldDropdown(CHOICES);
  }

  const propertyProcessor: GamepadBlock = {
    init: function () {
      const block = this as Blockly.Block;

      var PROPERTY_CHOICES = [
        ["A", "A"],
        ["B", "B"],
        ["X", "X"],
        ["Y", "Y"],
        ["DpadUp", "DpadUp"],
        ["DpadDown", "DpadDown"],
        ["DpadLeft", "DpadLeft"],
        ["DpadRight", "DpadRight"],
      ];
      block.setOutput(true); // no type, for compatibility
      block
        .appendDummyInput()
        .appendField(createGamepadDropdown(), "IDENTIFIER")
        .appendField(".")
        .appendField(new Blockly.FieldDropdown(PROPERTY_CHOICES), "PROP");
      block.setColour(getPropertyColor);

      var TOOLTIPS = [
        ["A", "Returns true if the A button is pressed."],
        ["B", "Returns true if the B button is pressed."],
        ["X", "Returns true if the X button is pressed."],
        ["Y", "Returns true if the Y button is pressed."],
        ["DpadUp", "Returns true if the dpad up button is pressed."],
        ["DpadDown", "Returns true if the dpad down button is pressed."],
        ["DpadLeft", "Returns true if the dpad left button is pressed."],
        ["DpadRight", "Returns true if the dpad right button is pressed."],
      ];
      block.setTooltip(function () {
        var key = block.getFieldValue("PROP");
        for (var i = 0; i < TOOLTIPS.length; i++) {
          if (TOOLTIPS[i][0] === key) {
            return TOOLTIPS[i][1];
          }
        }
        return "";
      });
    },
  };

  Blockly.Blocks["gamepad_getProperty"] = propertyProcessor;

  const getProperty = function (block: Blockly.Block) {
    var property = block.getFieldValue("PROP");
    var code = "checkGamepadKeyPress('" + property + "')";
    return [code, JavaScript.ORDER_FUNCTION_CALL];
  };

  addCustomBlock("gamepad_getProperty", undefined, getProperty);

  const booleanProcessor: GamepadBlock = {
    init: function () {
      const block = this as Blockly.Block;

      var PROPERTY_CHOICES = [
        ["A", "A"],
        ["B", "B"],
        ["X", "X"],
        ["Y", "Y"],
        ["DpadUp", "DpadUp"],
        ["DpadDown", "DpadDown"],
        ["DpadLeft", "DpadLeft"],
        ["DpadRight", "DpadRight"],
      ];

      block.setOutput(true, "Boolean");
      block
        .appendDummyInput()
        .appendField(createGamepadDropdown(), "IDENTIFIER")
        .appendField(".")
        .appendField(new Blockly.FieldDropdown(PROPERTY_CHOICES), "PROP");
      block.setColour(getPropertyColor);

      var TOOLTIPS = [
        ["A", "Returns true if the A button is pressed."],
        ["B", "Returns true if the B button is pressed."],
        ["X", "Returns true if the X button is pressed."],
        ["Y", "Returns true if the Y button is pressed."],
        ["DpadUp", "Returns true if the dpad up button is pressed."],
        ["DpadDown", "Returns true if the dpad down button is pressed."],
        ["DpadLeft", "Returns true if the dpad left button is pressed."],
        ["DpadRight", "Returns true if the dpad right button is pressed."],
      ];
      block.setTooltip(function () {
        var key = block.getFieldValue("PROP");
        for (var i = 0; i < TOOLTIPS.length; i++) {
          if (TOOLTIPS[i][0] === key) {
            return TOOLTIPS[i][1];
          }
        }
        return "";
      });
    },
  };

  Blockly.Blocks["gamepad_getProperty_Boolean"] = booleanProcessor;

  addCustomBlock("gamepad_getProperty_Boolean", undefined, getProperty);

  const numberProcessor: GamepadBlock = {
    init: function () {
      const block = this as Blockly.Block;

      var PROPERTY_CHOICES = [
        ["LeftStickX", "LeftStickX"],
        ["LeftStickY", "LeftStickY"],
        ["LeftTrigger", "LeftTrigger"],
        ["RightStickX", "RightStickX"],
        ["RightStickY", "RightStickY"],
        ["RightTrigger", "RightTrigger"],
      ];
      block.setOutput(true, "Number");
      block
        .appendDummyInput()
        .appendField(createGamepadDropdown(), "IDENTIFIER")
        .appendField(".")
        .appendField(new Blockly.FieldDropdown(PROPERTY_CHOICES), "PROP");
      block.setColour(getPropertyColor);
      var TOOLTIPS = [
        [
          "LeftStickX",
          "Returns a numeric value between -1.0 and +1.0 representing the left analog stick horizontal axis value.",
        ],
        [
          "LeftStickY",
          "Returns a numeric value between -1.0 and +1.0 representing the left analog stick vertical axis value.",
        ],
        [
          "LeftTrigger",
          "Returns a numeric value between 0.0 and +1.0 representing the left trigger value.",
        ],
        [
          "RightStickX",
          "Returns a numeric value between -1.0 and +1.0 representing the right analog stick horizontal axis value.",
        ],
        [
          "RightStickY",
          "Returns a numeric value between -1.0 and +1.0 representing the right analog stick vertical axis value .",
        ],
        [
          "RightTrigger",
          "Returns a numeric value between 0.0 and +1.0 representing the right trigger value.",
        ],
      ];
      block.setTooltip(function () {
        var key = block.getFieldValue("PROP");
        for (var i = 0; i < TOOLTIPS.length; i++) {
          if (TOOLTIPS[i][0] === key) {
            return TOOLTIPS[i][1];
          }
        }
        return "";
      });
    },
  };

  Blockly.Blocks["gamepad_getProperty_Number"] = numberProcessor;

  addCustomBlock("gamepad_getProperty_Number", undefined, getProperty);
}
