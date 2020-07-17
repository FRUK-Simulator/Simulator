import Blockly from "blockly";
import { JavaScriptGenerator } from "../../../@types/blockly-javascript";

interface GamepadPropertyProcessor {
  (block: Blockly.Block): [String, String];
}

interface JavaScriptGamepadGenerator extends JavaScriptGenerator {
  gamepad_getProperty?: GamepadPropertyProcessor;
  gamepad_getProperty_Number?: GamepadPropertyProcessor;
  gamepad_getProperty_Boolean?: GamepadPropertyProcessor;
  ORDER_FUNCTION_CALL: string;
}

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

  const blocklyJavascript = (Blockly as any)
    .JavaScript as JavaScriptGamepadGenerator;

  function createGamepadDropdown() {
    var CHOICES = [
      ["gamepad1", "gamepad1"],
      ["gamepad2", "gamepad2"],
    ];
    return new Blockly.FieldDropdown(CHOICES);
  }

  const propertyProcessor: GamepadBlock = {
    init: function () {
      const block = this as Blockly.Block;

      var PROPERTY_CHOICES = [
        ["A", "A"],
        ["AtRest", "AtRest"],
        ["B", "B"],
        ["Back", "Back"],
        ["DpadDown", "DpadDown"],
        ["DpadLeft", "DpadLeft"],
        ["DpadRight", "DpadRight"],
        ["DpadUp", "DpadUp"],
        ["Guide", "Guide"],
        ["LeftBumper", "LeftBumper"],
        ["LeftStickButton", "LeftStickButton"],
        ["LeftStickX", "LeftStickX"],
        ["LeftStickY", "LeftStickY"],
        ["LeftTrigger", "LeftTrigger"],
        ["RightBumper", "RightBumper"],
        ["RightStickButton", "RightStickButton"],
        ["RightStickX", "RightStickX"],
        ["RightStickY", "RightStickY"],
        ["RightTrigger", "RightTrigger"],
        ["Start", "Start"],
        ["X", "X"],
        ["Y", "Y"],
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
        [
          "AtRest",
          "Returns true if all analog sticks and triggers are in their rest position.",
        ],
        ["B", "Returns true if the B button is pressed."],
        ["Back", "Returns true if the Back button is pressed."],
        ["DpadDown", "Returns true if the dpad down button is pressed."],
        ["DpadLeft", "Returns true if the dpad left button is pressed."],
        ["DpadRight", "Returns true if the dpad right button is pressed."],
        ["DpadUp", "Returns true if the dpad up button is pressed."],
        [
          "Guide",
          "Returns true if the Guide button is pressed. The Guide button is often the large button in the middle of the controller.",
        ],
        ["LeftBumper", "Returns true if the left bumper is pressed."],
        [
          "LeftStickButton",
          "Returns true if the left stick button is pressed.",
        ],
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
        ["RightBumper", "Returns true if the right bumper is pressed."],
        [
          "RightStickButton",
          "Returns true if the right stick button is pressed.",
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
        ["Start", "Returns true if the Start button is pressed."],
        ["X", "Returns true if the X button is pressed."],
        ["Y", "Returns true if the Y button is pressed."],
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

  blocklyJavascript["gamepad_getProperty"] = function (block) {
    var property = block.getFieldValue("PROP");
    var code = "checkGamepadKeyPress(" + property + ")";
    return [code, blocklyJavascript.ORDER_FUNCTION_CALL];
  };

  const booleanProcessor: GamepadBlock = {
    init: function () {
      const block = this as Blockly.Block;

      var PROPERTY_CHOICES = [
        ["A", "A"],
        ["AtRest", "AtRest"],
        ["B", "B"],
        ["Back", "Back"],
        ["DpadDown", "DpadDown"],
        ["DpadLeft", "DpadLeft"],
        ["DpadRight", "DpadRight"],
        ["DpadUp", "DpadUp"],
        ["Guide", "Guide"],
        ["LeftBumper", "LeftBumper"],
        ["LeftStickButton", "LeftStickButton"],
        ["RightBumper", "RightBumper"],
        ["RightStickButton", "RightStickButton"],
        ["Start", "Start"],
        ["X", "X"],
        ["Y", "Y"],
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
        [
          "AtRest",
          "Returns true if all analog sticks and triggers are in their rest position.",
        ],
        ["B", "Returns true if the B button is pressed."],
        ["Back", "Returns true if the Back button is pressed."],
        ["DpadDown", "Returns true if the dpad down button is pressed."],
        ["DpadLeft", "Returns true if the dpad left button is pressed."],
        ["DpadRight", "Returns true if the dpad right button is pressed."],
        ["DpadUp", "Returns true if the dpad up button is pressed."],
        [
          "Guide",
          "Returns true if the Guide button is pressed. The Guide button is often the large button in the middle of the controller.",
        ],
        ["LeftBumper", "Returns true if the left bumper is pressed."],
        [
          "LeftStickButton",
          "Returns true if the left stick button is pressed.",
        ],
        ["RightBumper", "Returns true if the right bumper is pressed."],
        [
          "RightStickButton",
          "Returns true if the right stick button is pressed.",
        ],
        ["Start", "Returns true if the Start button is pressed."],
        ["X", "Returns true if the X button is pressed."],
        ["Y", "Returns true if the Y button is pressed."],
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

  blocklyJavascript["gamepad_getProperty_Boolean"] =
    blocklyJavascript["gamepad_getProperty"];

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

  blocklyJavascript["gamepad_getProperty_Number"] =
    blocklyJavascript["gamepad_getProperty"];
}
