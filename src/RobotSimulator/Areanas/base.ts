import { WorldConfig, CoreSpecs, CoreSimTypes } from "@fruk/simulator-core";

export interface ArenaConfig {
  name: string;
  worldConfig: WorldConfig;
  ballSpecs?: CoreSpecs.IBallSpec[];
  boxSpecs?: CoreSpecs.IBoxSpec[];
  coneSpecs?: CoreSpecs.IConeSpec[];
}

export interface ChallengeConfig {
  name: string;
  startPosition: CoreSimTypes.Vector2d;
  finishZoneSpec?: CoreSpecs.IZoneSpec;
  arenaConfig: ArenaConfig;
}
