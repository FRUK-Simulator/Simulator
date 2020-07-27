import { addDistanceSensorBlock } from "./SensorDistance";

export default (() => {
  addDistanceSensorBlock();

  return `
<category name="Sensors">
    <block type="distance_sensor"></block>
</category>
`;
})();
