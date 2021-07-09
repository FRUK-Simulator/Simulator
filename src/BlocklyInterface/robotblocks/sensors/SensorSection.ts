import { addDistanceSensorBlock } from "./SensorDistance";
import { addColorSensorBlock } from "./SensorColor";
import { addAngleSensorBlock } from "./AngleSensor";

export default (() => {
  addDistanceSensorBlock();
  addColorSensorBlock();
  addAngleSensorBlock();

  return `
<category name="Sensors">
    <block type="distance_sensor"></block>
    <block type="color_sensor"></block>
    <block type="angle_sensor"></block>
</category>
`;
})();
