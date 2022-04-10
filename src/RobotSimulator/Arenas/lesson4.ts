import {
  ArenaConfig,
  ChallengeConfig,
  ChallengeListener,
  ChallengeActions,
  ChallengeEvent,
} from "./base";
import { MessageType } from "../../state/messagesSlice";
import { CoreSimTypes } from "@fruk/simulator-core";
import { CoreSpecs } from "@fruk/simulator-core";
import { ChallengeStatus } from "./challengeSlice";
import { ArenaColourConstants } from "../../JavascriptVM/colourSensorConstants";

export const challenges = [challengeA, challengeB];

function arenaA(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 4 - Color Sensor",
    worldConfig: {
      zLength: 6,
      xLength: 6,
      walls: [],
      perimeter: {
        height: 0.5,
        thickness: 0.1,
      },
      camera: {
        position: {
          x: 0,
          y: 3,
          z: 3,
        },
      },
    },
  };

  return arenaConfig;
}

function arenaB(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 4 - Color Sensor",
    worldConfig: {
      zLength: 6,
      xLength: 6,
      walls: [
        {
          type: "wall",
          start: { x: 0, y: -0.7 },
          end: { x: 0, y: 3 },
          baseColor: 0x000000,
          height: 0.5,
          thickness: 0.2,
        },
        {
          type: "wall",
          start: { x: -2, y: -2.1 },
          end: { x: 0.2, y: -2.1 },
          baseColor: 0x000000,
          height: 0.5,
          thickness: 0.2,
        },
        {
          type: "wall",
          start: { x: 2.1, y: 1 },
          end: { x: 2.1, y: -2.1 },
          baseColor: 0x000000,
          height: 0.5,
          thickness: 0.2,
        },
      ],
      perimeter: {
        height: 0.5,
        thickness: 0.1,
      },
      camera: {
        position: {
          x: 0,
          y: 3,
          z: 3,
        },
      },
    },
  };

  return arenaConfig;
}

function challengeA(): ChallengeConfig {
  const colorZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -3, y: 1 },
          { x: -2, y: 1 },
          { x: -2, y: -1 },
          { x: -1, y: -1 },
          { x: -1, y: -2 },
          { x: 2, y: -2 },
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 3, y: 0.6 },
          { x: 2.4, y: 0.6 },
          { x: 2.4, y: -2.4 },
          { x: -1.4, y: -2.4 },
          { x: -1.4, y: -1.4 },
          { x: -2.4, y: -1.4 },
          { x: -2.4, y: 0.6 },
          { x: -3, y: 0.6 },
        ],
      },
      baseColor: ArenaColourConstants.RED,
      zoneId: "green",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -2, y: 3 },
          { x: -1.6, y: 3 },
          { x: -1.6, y: 2.4 },
          { x: -0.6, y: 2.4 },
          { x: -0.6, y: 0.4 },
          { x: 0.4, y: 0.4 },
          { x: 0.4, y: -0.6 },
          { x: 0.6, y: -0.6 },
          { x: 0.6, y: 2.4 },
          { x: 1.6, y: 2.4 },
          { x: 1.6, y: 3 },
          { x: 2, y: 3 },
          { x: 2, y: 2 },
          { x: 1, y: 2 },
          { x: 1, y: -1 },
          { x: 0, y: -1 },
          { x: 0, y: 0 },
          { x: -1, y: 0 },
          { x: -1, y: 2 },
          { x: -2, y: 2 },
        ],
      },
      baseColor: ArenaColourConstants.BLUE,
      zoneId: "blue",
    },
  ];

  const badZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -3, y: 0.6 },
          { x: -2.4, y: 0.6 },
          { x: -2.4, y: -1.4 },
          { x: -1.4, y: -1.4 },
          { x: -1.4, y: -2.4 },
          { x: 2.4, y: -2.4 },
          { x: 2.4, y: 0.6 },
          { x: 3, y: 0.6 },
          { x: 3, y: -3 },
          { x: -3, y: -3 },
        ],
      },
      baseColor: 0x000000,
      zoneId: "wall",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -1.6, y: 3 },
          { x: -1.6, y: 2.4 },
          { x: -0.6, y: 2.4 },
          { x: -0.6, y: 0.4 },
          { x: 0.4, y: 0.4 },
          { x: 0.4, y: -0.6 },
          { x: 0.6, y: -0.6 },
          { x: 0.6, y: 2.4 },
          { x: 1.6, y: 2.4 },
          { x: 1.6, y: 3 },
        ],
      },
      baseColor: 0x000000,
      zoneId: "wall",
    },
  ];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 4 - Challenge A",
    startPosition: { x: -2.5, y: 2.5 },
    arenaConfig: arenaA(),
    eventListener: new Lesson4Challenge(
      { x: 2.5, y: 2.5 },
      badZones,
      colorZones
    ),
    descriptions: {
      short: "Using color sensor to navigate",
      markdown: `
        TODO TODO TODO TODO TODO TODO 
  # Lesson 1 - Challenge A
  
  The robot needs to avoid the black areas of the playfield and end up in the green zone
  at the far side of the arena.
  
  If at any point the robot comes into contact with the black area then the robot must
  start again.
        `,
    },
  };

  return challengeConfig;
}

function challengeB(): ChallengeConfig {
  const badZones: CoreSpecs.IZoneSpec[] = [];

  const colorZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: -2.5, y: 0 },
      zoneShape: {
        type: "rectangle",
        xLength: 1,
        zLength: 6,
      },
      baseColor: ArenaColourConstants.RED,
      zoneId: "green",
    },
    {
      type: "zone",
      initialPosition: { x: 2.5, y: -0.5 },
      zoneShape: {
        type: "rectangle",
        xLength: 1,
        zLength: 5,
      },
      baseColor: ArenaColourConstants.RED,
      zoneId: "green",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: -2.5 },
      zoneShape: {
        type: "rectangle",
        xLength: 4,
        zLength: 1,
      },
      baseColor: ArenaColourConstants.RED,
      zoneId: "green",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: 1 },
      zoneShape: {
        type: "rectangle",
        xLength: 2,
        zLength: 4,
      },
      baseColor: ArenaColourConstants.BLUE,
      zoneId: "blue",
    },
  ];

  const challengeConfig: ChallengeConfig = {
    name: "Lesson 4 - Challenge B",
    startPosition: { x: -1.5, y: 2.5 },
    arenaConfig: arenaB(),
    eventListener: new Lesson4Challenge(
      { x: 2.5, y: 2.5 },
      badZones,
      colorZones
    ),
    descriptions: {
      short: "Using color sensor to navigate with walls",
      markdown: `
  # Lesson 1 - Challenge B
  
  The robot needs to avoid the black areas of the playfield and end up in the green zone
  at the far side of the arena.
  
  This time the route isn't going to be a straight one.
  
  If at any point the robot comes into conact with the black area then the robot must
  start again.
        `,
    },
  };

  return challengeConfig;
}

const FinishZoneId = "finish-zone";

class Lesson4Challenge implements ChallengeListener {
  private challengeOutcomePending: boolean;
  constructor(
    public finishPosition: CoreSimTypes.Vector2d,
    public badZones: CoreSpecs.IZoneSpec[],
    public colorZones: CoreSpecs.IZoneSpec[]
  ) {
    this.challengeOutcomePending = true;
  }
  actions?: ChallengeActions;

  onStart(actions: ChallengeActions) {
    this.actions = actions;
    actions.addObject({
      type: "zone",
      initialPosition: this.finishPosition,
      zoneId: FinishZoneId,
      zoneShape: {
        type: "rectangle",
        zLength: 1,
        xLength: 1,
      },
      baseColor: ArenaColourConstants.GREEN,
    });
    this.badZones.forEach((z) => {
      z.zoneId = "bad-" + z.zoneId;
      actions.addObject(z);
    });
    this.colorZones.forEach((z) => {
      z.zoneId = "color-" + z.zoneId;
      actions.addObject(z);
    });

    this.challengeOutcomePending = true;
  }

  onStop() {
    this.actions = undefined;
  }

  onEvent(e: ChallengeEvent) {
    if (e.kind === "ZoneEvent") {
      if (e.zoneId === FinishZoneId && this.challengeOutcomePending) {
        this.challengeOutcomePending = false;
        this.actions?.displayFadingMessage("Robot Wins!", MessageType.success);
        this.actions?.setChallengeStatus(ChallengeStatus.Success);
      } else if (e.zoneId.startsWith("bad-") && this.challengeOutcomePending) {
        this.challengeOutcomePending = false;
        this.actions?.displayFadingMessage("Robot Looses!", MessageType.danger);
        this.actions?.setChallengeStatus(ChallengeStatus.Failure);
      }
    }
  }
}
