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

export const arenas = [arena];
export const challenges = [challengeA, challengeB, challengeC];

function arena(): ArenaConfig {
  const arenaConfig: ArenaConfig = {
    name: "Lesson 1",
    worldConfig: {
      zLength: 5,
      xLength: 5,
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
  const badZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: -1.2, y: 0 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.5,
        zLength: 5,
      },
      baseColor: 0x000000,
      zoneId: "0",
    },
    {
      type: "zone",
      initialPosition: { x: 1.2, y: 0 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.5,
        zLength: 5,
      },
      baseColor: 0x000000,
      zoneId: "1",
    },
  ];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge A",
    startPosition: { x: 0, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson1Challenge({ x: 0, y: -2 }, badZones),
    descriptions: {
      short:
        "Drive motors at the same speed to create forward " +
        "drive for a certain distance",
      markdown: `
## Temperat posse Neretum

Lorem markdownum. Meis has *Scirone* inter fraternis esse. Agmine quid;
lacertis, veni mora ut: pars turba, undis **decipit**; meae iuvenes sit! Metu
nec et germanam quamquam. Lac morte interdum mihi inploravere rogat
poenaededidit ocior Cephenum quoque, ferunt.

    e_multicasting_soa.softwarePopVlog = partitionCamelcase;
    if (socket - code * irq) {
        android_mirror(web);
        proxy_redundancy.networking(grayscale_metal);
        donationware_ios_pram.hardMemory.basic_web_install(mode / 1);
    } else {
        protector = rasterStringWindows.root(pngSymbolic, 4,
                bsodAnalystPeopleware);
        camera_minicomputer_yottabyte.abend += -1;
        template.archie += import.localhost(server, cdn_file,
                rw_icann.urlInterpreter.dos(image_io_ultra, expression));
    }
    mode_google.drive += xmlTrinitron + office_meta +
            passivePostscriptPim.resourcesDaemon(ftp_error);
    bar.tabletRemoteSdk -= menu_meta(user(duplex, driveZettabyte, 5));

## Pastoris admonitu

Ampyca nec negaretur greges, iuvenalis, *gravem*, uni lumina: non dixit: nam.
**Anguis** Circe! Magis cornua, ut auras dextera. Nec qua, sparsit ipsa caelo
Phoebus, vincemur iustitia et atro venatibus saepes,
[primumque](http://nomen.com/sardibusfacinus.aspx).

1. Quae gelido
2. Aethera altera cognataque pharetram vitare
3. Quam fuerant relinquit corpore pallenti dispersa
4. Sperat modo
5. Unoque rogati
6. Modum parte et possum novam collocat custos

Genero tamen suis umeris albo pollue et quamvis cursus tosta. Sinit sic, nostro,
timide ostro, congestaque, ut ista erat, illo diremit equidem **paulatim
ceciderunt me**. Gelidis suspiria, aristas clausere crudeles deflevit honore
fretum poterant; tumulo?
      `,
    },
  };

  return challengeConfig;
}

function challengeB(): ChallengeConfig {
  const badZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: 0, y: 1 },
      zoneShape: {
        type: "rectangle",
        xLength: 1,
        zLength: 3,
      },
      baseColor: 0x000000,
      zoneId: "0",
    },
  ];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge B",
    startPosition: { x: -2, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson1Challenge({ x: +2, y: 2 }, badZones),
  };

  return challengeConfig;
}

function challengeC(): ChallengeConfig {
  const badZones: CoreSpecs.IZoneSpec[] = [
    {
      type: "zone",
      initialPosition: { x: -1.4, y: 0.5 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.2,
        zLength: 4,
      },
      baseColor: 0x000000,
      zoneId: "0",
    },
    {
      type: "zone",
      initialPosition: { x: 1.4, y: 0.5 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.2,
        zLength: 4,
      },
      baseColor: 0x000000,
      zoneId: "1",
    },
    {
      type: "zone",
      initialPosition: { x: 0, y: -0.5 },
      zoneShape: {
        type: "rectangle",
        xLength: 0.4,
        zLength: 4,
      },
      baseColor: 0x000000,
      zoneId: "2",
    },
  ];
  const challengeConfig: ChallengeConfig = {
    name: "Lesson 1 - Challenge C",
    startPosition: { x: -2, y: 2 },
    arenaConfig: arena(),
    eventListener: new Lesson1Challenge({ x: 2, y: 2 }, badZones),
  };

  return challengeConfig;
}

const FinishZoneId = "finish-zone";

class Lesson1Challenge implements ChallengeListener {
  private challengeOutcomePending: boolean;
  constructor(
    public finishPosition: CoreSimTypes.Vector2d,
    public badZones: CoreSpecs.IZoneSpec[]
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
    this.challengeOutcomePending = true;
  }

  onStop() {
    this.actions = undefined;
  }

  onEvent(e: ChallengeEvent) {
    if (e.kind === "ZoneEvent") {
      if (e.zoneId === FinishZoneId && this.challengeOutcomePending === true) {
        this.challengeOutcomePending = false;
        this.actions?.displayFadingMessage("Robot Wins!", MessageType.success);
        this.actions?.setChallengeStatus(ChallengeStatus.Success);
      } else if (
        e.zoneId.startsWith("bad-") &&
        this.challengeOutcomePending === true
      ) {
        this.challengeOutcomePending = false;
        this.actions?.displayFadingMessage("Robot Looses!", MessageType.danger);
        this.actions?.setChallengeStatus(ChallengeStatus.Failure);
      }
    }
  }
}
