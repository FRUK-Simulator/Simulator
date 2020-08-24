import { CoreSimTypes, CoreSpecs } from "@fruk/simulator-core";

export function createFinishZoneSpec(
  initialPosition: CoreSimTypes.Vector2d
): CoreSpecs.IZoneSpec {
  let finishZoneSpec: CoreSpecs.IZoneSpec = {
    type: "zone",
    zoneId: "finish",
    xLength: 2,
    zLength: 2,
    baseColor: 0x00ff00,
    initialPosition: initialPosition,
  };

  return finishZoneSpec;
}

export function expand<T>(list: (() => T)[]): T[] {
  let ts = [];
  for (const t of list) {
    ts.push(t());
  }
  return ts;
}
