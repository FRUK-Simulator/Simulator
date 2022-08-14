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

export const challenges = [challengeA, challengeB, challengeC];

function arenaA(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 4 - Color Sensor",
    worldConfig: {
      zLength: 6,
      xLength: 6,
      walls: [
        {
          type: "wall",
          start: { x: -1.2, y: -2.5 },
          end: { x: -1.2, y: 2.5 },
          baseColor: 0x000000,
          height: 0.5,
          thickness: 0.5,
        },
        {
          type: "wall",
          start: { x: 1.2, y: -2.5 },
          end: { x: 1.2, y: 2.5 },
          baseColor: 0x000000,
          height: 0.5,
          thickness: 0.5,
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

function arenaB(): ArenaConfig {
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

function arenaC(): ArenaConfig {
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

function challengeA(): ChallengeConfig {
  const badZones: CoreSpecs.IZoneSpec[] = [];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 4 - Challenge A",
    startPosition: { x: 0, y: 2 },
    arenaConfig: arenaA(),
    eventListener: new Lesson4Challenge({ x: 0, y: -2 }, [], badZones),
    descriptions: {
      short: "Using color sensor to navigate",
      markdown: `
  # Lesson 4 - Challenge A
  
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
  const warnZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -3, y: -3 },
          { x: 3, y: -3 },
          { x: 3, y: 2 },
          { x: 2, y: 2 },
          { x: 2, y: -2 },
          { x: -2, y: -2 },
          { x: -2, y: 3 },
          { x: -3, y: 3 },
        ],
      },
      baseColor: ArenaColourConstants.LIGHT_GREEN,
      zoneId: "light_green",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: 1 },
      zoneShape: {
        type: "rectangle",
        xLength: 2,
        zLength: 4,
      },
      baseColor: ArenaColourConstants.LIGHT_BLUE,
      zoneId: "light_blue",
    },
  ];
  const badZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -3, y: 3 },
          { x: -2.75, y: 3 },
          { x: -2.75, y: -2.75 },
          { x: 2.75, y: -2.75 },
          { x: 2.75, y: 2 },
          { x: 3, y: 2 },
          { x: 3, y: -3 },
          { x: -3, y: -3 },
        ],
      },
      baseColor: ArenaColourConstants.BLACK,
      zoneId: "black",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -0.125, y: 3 },
          { x: -0.125, y: -0.25 },
          { x: 0.125, y: -0.25 },
          { x: 0.125, y: 3 },
        ],
      },
      baseColor: ArenaColourConstants.BLACK,
      zoneId: "black",
    },
  ];

  const challengeConfig: ChallengeConfig = {
    name: "Lesson 4 - Challenge B",
    startPosition: { x: -1.5, y: 2.5 },
    arenaConfig: arenaB(),
    eventListener: new Lesson4Challenge(
      { x: 2.5, y: 2.5 },
      warnZones,
      badZones
    ),
    descriptions: {
      short: "Using color sensor to navigate with walls",
      markdown: `
  # Lesson 4 - Challenge B
  
  The robot needs to avoid the black areas of the playfield and end up in the darker green zone
  at the far side of the arena and remain there for at least 5s. 
  
  This time the route isn't going to be a straight one.
  
  If at any point the robot comes into contact with the black area then the robot must
  start again.
        `,
    },
  };

  return challengeConfig;
}

function challengeC(): ChallengeConfig {
  const warnZones: CoreSpecs.IZoneSpec[] = [
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
          { x: 3, y: 0.5 },
          { x: 2.5, y: 0.5 },
          { x: 2.5, y: -2.5 },
          { x: -1.5, y: -2.5 },
          { x: -2.5, y: -1.5 },
          { x: -1.5, y: -1.5 },
          { x: -2.5, y: -1.5 },
          { x: -3, y: 0.5 },
        ],
      },
      baseColor: ArenaColourConstants.LIGHT_GREEN,
      zoneId: "light_green",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -2, y: 3 },
          { x: -2, y: 2 },
          { x: -1, y: 2 },
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: -1 },
          { x: 1, y: -1 },
          { x: 1, y: 2 },
          { x: 2, y: 2 },
          { x: 2, y: 3 },
          { x: -1.5, y: 3 },
          { x: -1.5, y: 2.5 },
          { x: -0.5, y: 2.5 },
          { x: -0.5, y: 0.5 },
          { x: 0.5, y: 0.5 },
          { x: 0.5, y: 2.5 },
          { x: 1.5, y: 2.5 },
          { x: 1.5, y: 3 },
        ],
      },
      baseColor: ArenaColourConstants.LIGHT_BLUE,
      zoneId: "light_blue",
    },
  ];
  const badZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -3, y: 0.5 },
          { x: -3, y: -3 },
          { x: 3, y: -3 },
          { x: 3, y: 0.5 },
          { x: 2.5, y: 0.5 },
          { x: 2.5, y: -2.5 },
          { x: -1.5, y: -2.5 },
          { x: -1.5, y: -1.5 },
          { x: -2.5, y: -1.5 },
          { x: -2.5, y: 0.5 },
        ],
      },
      baseColor: ArenaColourConstants.BLACK,
      zoneId: "black",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: 0 },
      zoneShape: {
        type: "polygon",
        points: [
          { x: -1.5, y: 3 },
          { x: -1.5, y: 2.5 },
          { x: -0.5, y: 2.5 },
          { x: -0.5, y: 0.5 },
          { x: 0.5, y: 0.5 },
          { x: 0.5, y: 2.5 },
          { x: 1.5, y: 2.5 },
          { x: 1.5, y: 3 },
        ],
      },
      baseColor: ArenaColourConstants.BLACK,
      zoneId: "black",
    },
  ];

  const challengeConfig: ChallengeConfig = {
    name: "Lesson 4 - Challenge C",
    startPosition: { x: -2.5, y: 2.5 },
    arenaConfig: arenaC(),
    eventListener: new Lesson4Challenge(
      { x: 2.5, y: 2.5 },
      warnZones,
      badZones
    ),
    descriptions: {
      short: "Using color sensor to navigate with walls",
      markdown: `
  # Lesson 4 - Challenge C
  
  The robot needs to avoid the black areas of the playfield and end up in the darker green zone
  at the far side of the arena and remain there for at least 5s. 
  
  This time the route isn't going to be a straight one.
  
  If at any point the robot comes into contact with the black area then the robot must
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
    public warnZones: CoreSpecs.IZoneSpec[],
    public badZones: CoreSpecs.IZoneSpec[]
  ) {
    this.challengeOutcomePending = true;
  }
  actions?: ChallengeActions;
  timeoutId?: NodeJS.Timeout;

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
    this.warnZones.forEach((z) => {
      z.zoneId = "warn-" + z.zoneId;
      actions.addObject(z);
    });
    this.badZones.forEach((z) => {
      z.zoneId = "bad-" + z.zoneId;
      actions.addObject(z);
    });
    this.challengeOutcomePending = true;
  }

  onStop() {
    this.actions = undefined;
  }

  onEvent(e: ChallengeEvent) {
    if (e.kind === "ZoneEvent") {
      if (e.zoneId === FinishZoneId && this.challengeOutcomePending === true) {
        if (e.entry) {
          this.timeoutId = setTimeout(this.markComplete.bind(this), 5000);
          this.actions?.displayMessage(
            "Stay in the zone for 5 seconds",
            MessageType.info
          );
        } else if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.challengeOutcomePending = true;
        }
      } else if (
        e.zoneId.startsWith("bad-") &&
        this.challengeOutcomePending === true
      ) {
        this.challengeOutcomePending = false;
        this.actions?.displayFadingMessage("Robot Looses!", MessageType.danger);
        this.actions?.setChallengeStatus(ChallengeStatus.Failure);
      } else if (e.zoneId.endsWith("light_green") && e.entry) {
        this.actions?.displayFadingMessage("Go right!", MessageType.info);
      } else if (e.zoneId.endsWith("light_blue") && e.entry) {
        this.actions?.displayFadingMessage("Go left!", MessageType.info);
      }
    }
  }

  markComplete(): void {
    console.log("timeout now");
    this.challengeOutcomePending = false;
    this.actions?.displayMessage("Robot Wins!", MessageType.success);
    this.actions?.setChallengeStatus(ChallengeStatus.Success);
  }
}
