import ActuatorSection from "./robotblocks/actuators/ActuatorSection";
import SensorSection from "./robotblocks/sensors/SensorSection";
import GeneralSection from "./robotblocks/general/GeneralSection";

/**
 * Returns the XML for the Toolbox.
 */
export function getDefaultToolbox() {
  return `
<xml>
    ${ActuatorSection}
    ${SensorSection}
    ${GeneralSection}
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
