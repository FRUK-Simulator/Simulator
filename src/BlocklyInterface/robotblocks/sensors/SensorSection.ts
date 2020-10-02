import { addDistanceSensorBlock } from "./SensorDistance";
import { addColorSensorBlock } from "./SensorColor";

export default (() => {
  addDistanceSensorBlock();
  addColorSensorBlock();

  return `
<category name="Sensors">
    <block type="distance_sensor"></block>
    <block type="color_sensor"></block>
</category>
`;
})();
