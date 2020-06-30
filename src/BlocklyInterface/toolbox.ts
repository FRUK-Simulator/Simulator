import ActuatorSection from "./robotblocks/actuators/ActuatorSection";
import SensorSection from "./robotblocks/sensors/SensorSection";
import LogicSection from "./robotblocks/logic/LogicSection";
import MathSection from "./robotblocks/math/MathSection";
import ConstantsSection from "./robotblocks/constants/ConstantsSection";
import LoopSection from "./robotblocks/loops/LoopSection";

/**
 * Returns the XML for the Toolbox.
 */
export function getDefaultToolbox() {
  return `
<xml>
    ${ActuatorSection}
    ${SensorSection}
    ${LogicSection}
    ${MathSection}
    ${ConstantsSection}
    ${LoopSection}
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
