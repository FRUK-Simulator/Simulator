import ActuatorSection from "./robotblocks/actuators/ActuatorSection";
import SensorSection from "./robotblocks/sensors/SensorSection";
import GeneralSection from "./robotblocks/general/GeneralSection";

/**
 * Returns the XML for the Toolbox.
 */
export function getToolbox() {
  return `
<xml>
    ${ActuatorSection}
    ${SensorSection}
    ${GeneralSection}
</xml>`;
}
