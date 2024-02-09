import { WorldConfig, CoreSpecs, CoreSimTypes } from "@fruk/simulator-core";
import { MessageType } from "../../state/messagesSlice";
import { ChallengeStatus } from "./challengeSlice";

export interface ArenaConfig {
  name: string;
  worldConfig: WorldConfig;
  ballSpecs?: CoreSpecs.IBallSpec[];
  boxSpecs?: CoreSpecs.IBoxSpec[];
  coneSpecs?: CoreSpecs.IConeSpec[];
  zoneSpecs?: CoreSpecs.IZoneSpec[];
}

interface ChallengeDescription {
  short: string;
  markdown?: string;
}

export interface MaxBlockConfig {
  /**
   * The maximum number of blocks the student can/should use.
   */
  maxBlocks: number;

  /**
   * Whether the limit is hard or soft.
   *
   * Hard limit block the student from adding more than maxBlocks.
   * Soft limit just let the user know they should use that many blocks.
   */
  isHardLimit: boolean;
}

export interface RobotConfig {
  disableDistanceSensor: boolean;
}

export interface ChallengeConfig {
  name: string;
  startPosition: CoreSimTypes.Vector2d;
  arenaConfig: ArenaConfig;
  eventListener?: ChallengeListener;
  descriptions?: ChallengeDescription;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  maxBlocksConfig?: MaxBlockConfig;
  robotConfig?: RobotConfig;
}

// interface to trigger actions and events in the current challenge.
export interface ChallengeActions {
  addObject(
    o:
      | CoreSpecs.IBallSpec
      | CoreSpecs.IBoxSpec
      | CoreSpecs.IConeSpec
      | CoreSpecs.IZoneSpec,
  ): void;
  displayMessage(message: string, type: MessageType): void;
  /** @param timeout timeout in milliseconds */
  displayFadingMessage(
    message: string,
    type: MessageType,
    timeout?: number,
  ): void;
  clearAllMessages(): void;
  setChallengeStatus(status: ChallengeStatus): void;
  terminateChallenge(): void;
}

export interface ZoneEvent {
  kind: "ZoneEvent";
  zoneId: string;
  entry: boolean;
  id?: string;
}

export interface CollisionEvent {
  kind: "CollisionEvent";
  objectA: string;
  objectB: string;
}

export type ChallengeEvent = ZoneEvent | CollisionEvent;

export interface ChallengeListener {
  onStart(actions: ChallengeActions): void;
  onStop(): void;

  onEvent(e: ChallengeEvent): void;
}
