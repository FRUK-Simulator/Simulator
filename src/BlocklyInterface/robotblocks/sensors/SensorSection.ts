import { addDistanceSensorBlock } from "./SensorDistance";
import { addColorSensorBlock } from "./SensorColor";
import { addGyroBlock } from "./SensorGyroscope";

export default (() => {
  addDistanceSensorBlock();
  addColorSensorBlock();
  addGyroBlock();

  return `
<category name="Sensors">
    <block type="distance_sensor"></block>
    <block type="color_sensor"></block>
    <block type="gyroscope_sensor"></block>
</category>
`;
})();
