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

export interface ChallengeConfig {
  name: string;
  startPosition: CoreSimTypes.Vector2d;
  arenaConfig: ArenaConfig;
  eventListener?: ChallengeListener;
  descriptions?: ChallengeDescription;
  image?: any;
}

// interface to trigger actions and events in the current challenge.
export interface ChallengeActions {
  addObject(
    o:
      | CoreSpecs.IBallSpec
      | CoreSpecs.IBoxSpec
      | CoreSpecs.IConeSpec
      | CoreSpecs.IZoneSpec
  ): void;
  displayMessage(message: string, type: MessageType): void;
  displayFadingMessage(
    message: string,
    type: MessageType,
    timeout?: number
  ): void;
  setChallengeStatus(status: ChallengeStatus): void;
}

export interface ZoneEvent {
  kind: "ZoneEvent";
  zoneId: string;
  entry: boolean;
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
