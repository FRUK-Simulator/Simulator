import ActuatorSection from "./robotblocks/actuators/ActuatorSection";
import MechanismSection from "./robotblocks/mechanisms/MechanismSection";
import SensorSection from "./robotblocks/sensors/SensorSection";
import GamepadSection from "./robotblocks/gamepad/GamepadSection";
import GeneralSection from "./robotblocks/general/GeneralSection";
import EnumSection from "./robotblocks/enums/EnumSection";

/**
 * Returns the XML for the Toolbox.
 */
export function getDefaultToolbox() {
  return `
<xml>
    ${ActuatorSection}
    ${MechanismSection}
    ${SensorSection}
    ${GamepadSection}
    ${GeneralSection}
    ${EnumSection}
</xml>`;
}

/**
 * Returns an empty toolbox (at least one category is needed)
 */
export function getEmptyToolbox() {
  return `
<xml>
  <category />
</xml>`;
}
