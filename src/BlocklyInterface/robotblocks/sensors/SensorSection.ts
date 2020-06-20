import { addSensorTouchBlock } from "./SensorTouch";

export default (() => {
  addSensorTouchBlock();

  return `
<category name="Sensors">
    <block type="sensor_touch"></block>
</category>
`;
})();
