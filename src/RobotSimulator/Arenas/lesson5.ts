import {
  ArenaConfig,
  ChallengeConfig,
  ChallengeListener,
  ChallengeActions,
  ChallengeEvent,
} from "./base";
import { ChallengeStatus } from "./challengeSlice";
import { MessageType } from "../../state/messagesSlice";
import { WorldConfig } from "@fruk/simulator-core";
import {
  IBoxSpec,
  IZoneSpec,
} from "@fruk/simulator-core/dist/engine/specs/CoreSpecs";
import { Vector2d } from "@fruk/simulator-core/dist/engine/SimTypes";

export const arenas = [arenaChallengeA];
export const challenges = [challengeA, challengeB];

function defaultWorldConfig(): WorldConfig {
  const worldConfig = {
    zLength: 6,
    xLength: 6,
    walls: [],
    perimeter: {
      height: 0.5,
      thickness: 0.1,
    },
    camera: {
      position: {
        x: 3,
        y: 3,
        z: 3,
      },
    },
  };
  return worldConfig;
}

function defaultHomeZone(): IZoneSpec[] {
  const zoneSpecs: IZoneSpec[] = [
    {
      type: "zone",
      zoneId: "home-sw",
      baseColor: 0x00cc00,
      initialPosition: {
        x: -0.5,
        y: 0.5,
      },
      zoneShape: {
        type: "rectangle",
        zLength: 1,
        xLength: 1,
      },
    },
    {
      type: "zone",
      zoneId: "home-nw",
      baseColor: 0xffffff,
      initialPosition: {
        x: -0.5,
        y: -0.5,
      },
      zoneShape: {
        type: "rectangle",
        zLength: 1,
        xLength: 1,
      },
    },
    {
      type: "zone",
      zoneId: "home-ne",
      baseColor: 0x00cc00,
      initialPosition: {
        x: 0.5,
        y: -0.5,
      },
      zoneShape: {
        type: "rectangle",
        zLength: 1,
        xLength: 1,
      },
    },
    {
      type: "zone",
      zoneId: "home-se",
      baseColor: 0xffffff,
      initialPosition: {
        x: 0.5,
        y: 0.5,
      },
      zoneShape: {
        type: "rectangle",
        zLength: 1,
        xLength: 1,
      },
    },
  ];

  return zoneSpecs;
}

function getBox(id: string, position: Vector2d): IBoxSpec {
  const box: IBoxSpec = {
    type: "box",
    id: id,
    dimensions: {
      x: 0.25,
      y: 0.25,
      z: 0.25,
    },
    initialPosition: position,
    baseColor: 0xffffff,
    isStatic: false,
  };

  return box;
}

function arenaChallengeA(): ArenaConfig {
  const arenaConfigA: ArenaConfig = {
    name: "Lesson 5 - Against the Clock level is timed",
    worldConfig: defaultWorldConfig(),
    zoneSpecs: [
      ...defaultHomeZone(),
      {
        type: "zone",
        zoneId: "block-nw",
        baseColor: 0xff0000,
        initialPosition: {
          x: -2.5,
          y: -2.5,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "path-nw",
        baseColor: 0xff0000,
        initialPosition: {
          x: -1.5,
          y: -1.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 3,
        },
      },
      {
        type: "zone",
        zoneId: "block-se",
        baseColor: 0xff0000,
        initialPosition: {
          x: 2.5,
          y: 2.5,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "path-se",
        baseColor: 0xff0000,
        initialPosition: {
          x: 1.5,
          y: 1.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 3,
        },
      },
      {
        type: "zone",
        zoneId: "block-sw",
        baseColor: 0x3399ff,
        initialPosition: {
          x: -2.5,
          y: 2.5,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "path-sw",
        baseColor: 0x3399ff,
        initialPosition: {
          x: -1.5,
          y: 1.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 3,
        },
      },
      {
        type: "zone",
        zoneId: "block-ne",
        baseColor: 0x3399ff,
        initialPosition: {
          x: 2.5,
          y: -2.5,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "path-ne",
        baseColor: 0x3399ff,
        initialPosition: {
          x: 1.5,
          y: -1.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 3,
        },
      },
    ],
    boxSpecs: [
      getBox("box-nw", { x: -2.5, y: -2.5 }),
      getBox("box-se", { x: 2.5, y: 2.5 }),
      getBox("box-ne", { x: 2.5, y: -2.5 }),
      getBox("box-sw", { x: -2.5, y: 2.5 }),
    ],
  };

  const arenaConfig: ArenaConfig = arenaConfigA;
  return arenaConfig;
}

function arenaChallengeB(): ArenaConfig {
  const arenaConfigA: ArenaConfig = {
    name: "Lesson 5 - Against the Clock level is timed",
    worldConfig: defaultWorldConfig(),
    zoneSpecs: [
      ...defaultHomeZone(),
      {
        type: "zone",
        zoneId: "block-nw",
        baseColor: 0x7f00ff,
        initialPosition: {
          x: -1.5,
          y: -2.5,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "path-nw",
        baseColor: 0x7f00ff,
        initialPosition: {
          x: -1.5,
          y: -1.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "block-se",
        baseColor: 0x7f00ff,
        initialPosition: {
          x: 1.5,
          y: 2.5,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "path-se",
        baseColor: 0x7f00ff,
        initialPosition: {
          x: 1.5,
          y: 1.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "block-sw",
        baseColor: 0xcccc00,
        initialPosition: {
          x: -2.5,
          y: 1.5,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "path-sw",
        baseColor: 0xcccc00,
        initialPosition: {
          x: -1.5,
          y: 1.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "block-ne",
        baseColor: 0xcccc00,
        initialPosition: {
          x: 2.5,
          y: -1.5,
        },
        zoneShape: {
          type: "rectangle",
          zLength: 1,
          xLength: 1,
        },
      },
      {
        type: "zone",
        zoneId: "path-ne",
        baseColor: 0xcccc00,
        initialPosition: {
          x: 1.5,
          y: -1.5,
        },
        zoneShape: {
          type: "rectangle",
          xLength: 1,
          zLength: 1,
        },
      },
    ],
    boxSpecs: [
      getBox("box-nw", { x: -1.5, y: -1.5 }),
      getBox("box-se", { x: 1.5, y: 1.5 }),
      getBox("box-ne", { x: 1.5, y: -1.5 }),
      getBox("box-sw", { x: -1.5, y: 1.5 }),
    ],
  };

  const arenaConfig: ArenaConfig = arenaConfigA;
  return arenaConfig;
}

function challengeA(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 5 - Challenge A",
    startPosition: { x: 0, y: 0 },
    arenaConfig: arenaChallengeA(),
    eventListener: new Lesson5Challenge([
      "box-nw",
      "box-ne",
      "box-sw",
      "box-se",
    ]),
    descriptions: {
      short: "Block Race",
      markdown: `
# Lesson 5 - Challenge A

Use your skills to collect the blocks as fast as possible and place in centre.

Squares coloured to allow colour sensor use if wanted.
      `,
    },
  };

  return challengeConfig;
}

function challengeB(): ChallengeConfig {
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 5 - Challenge B",
    startPosition: { x: 0, y: 0 },
    arenaConfig: arenaChallengeB(),
    eventListener: new Lesson5Challenge([
      "box-nw",
      "box-ne",
      "box-sw",
      "box-se",
    ]),
    descriptions: {
      short: "Barrier Blocks",
      markdown: `
# Lesson 5 - Challenge B

Use your skills to collect the blocks as fast as possible and place in green centre.

This level has coloured squares so the colour sensor can be used and barriers (thick black lines)

so distance sensor can be used.
      `,
    },
  };

  return challengeConfig;
}

class Lesson5Challenge implements ChallengeListener {
  actions?: ChallengeActions;
  targets: Set<string>;

  constructor(targets: Array<string>) {
    this.targets = new Set(targets);
  }

  onStart(actions: ChallengeActions) {
    this.actions = actions;
  }

  onStop() {
    this.actions = undefined;
  }

  onEvent(e: ChallengeEvent) {
    if (e.kind === "ZoneEvent" && e.id?.startsWith("box")) {
      if (e.entry && e.zoneId.startsWith("home")) {
        this.actions?.displayMessage("Moved one box", MessageType.danger);
        this.targets.delete(e.id);

        if (this.targets.size === 0) {
          this.actions?.setChallengeStatus(ChallengeStatus.Success);
          this.actions?.displayMessage(
            "Robot finished the challenge",
            MessageType.success
          );
          this.actions?.terminateChallenge();
        }
        return;
      }
    }
    console.debug("Unprocessed Event", e);
  }

  markComplete(): void {}
}
