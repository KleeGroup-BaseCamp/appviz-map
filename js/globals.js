const COLORS = [
  [0, 119, 182],
  [0, 180, 216],
  [144, 224, 239],
  [128, 255, 219],
];

//Temporary styles

const DEFAULT_STYLE = {
  font: {
    fill: 255,
    name: "Helvetica",
    size: 18,
  },
  setting: {
    default: {
      fill: COLORS[0],
      stroke: 255,
      strokeWeight: 2
    },
    hover: {
      fill: COLORS[3],
      stroke: 255,
      strokeWeight: 2
    },
  },
};

const BACKGROUND_COLOR = ["#040413"];

let styles;
const initStyles = () => {
  styles = {
    domainsView: {
      zones: {
        font: {
          fill: 255,
          name: fonts.roboto,
          size: 32,
        },
        setting: {
          default: {
            fill: [0, 0], // Black fill with 0 opacity => No fill
            stroke: 255,
            strokeWeight: 1,
          },
          hover: {
            fill: [0, 0],
            stroke: 255,
            strokeWeight: 1
          },
        },
      },
      pilotage: {
        font: {
          fill: 255,
          name: fonts.roboto,
          size: 20,
        },
        setting: {
          default: {
            fill: [4, 12, 44],
            stroke: fake.zones.pilotage.color,
            strokeWeight: 2,
          },
          hover: {
            fill: [4, 82, 134],
            stroke: fake.zones.pilotage.color,
            strokeWeight: 3
          },
        },
      },
      operationnel: {
        font: {
          fill: 255,
          name: fonts.roboto,
          size: 20,
        },
        setting: {
          default: {
            fill: [4, 12, 44],
            stroke: fake.zones.operationnel.color,
            strokeWeight: 2,
          },
          hover: {
            fill: [4, 82, 134],
            stroke: fake.zones.operationnel.color,
            strokeWeight: 3
          },
        },
      },
      referentiel: {
        font: {
          fill: 255,
          name: fonts.roboto,
          size: 20,
        },
        setting: {
          default: {
            fill: [4, 12, 44],
            stroke: fake.zones.referentiel.color,
            strokeWeight: 2,
          },
          hover: {
            fill: [4, 82, 134],
            stroke: fake.zones.referentiel.color,
            strokeWeight: 3
          },
        },
      },
      items: {
        font: {
          fill: 255,
          name: fonts.fa,
          size: 14,
        },
        setting: {
          default: {
            fill: [0, 0],
            stroke: [1, 255, 255],
            strokeWeight: 2,
          },
        },
      },
      grid: {
        setting: {
          default: {
            fill: 0,
            stroke: [255, 30],
            strokeWeight: 1,
          },
        },
      },
    },
    groupView: {
      group: {
        font: {
          fill: [255],
          name: fonts.roboto,
          size: 42,
        },
        setting: {
          default: {
            fill: [0, 0],
            stroke: 255,
            strokeWeight: 0,
          },
          hover: {
            fill: [0, 0],
            stroke: 255,
            strokeWeight: 0,
          },
        },
      },
      itemType: {
        font: {
          fill: 255,
          name: fonts.fa,
          size: 20,
        },
        setting: {
          default: {
            fill: [4, 28, 60],
            stroke: 255,
            strokeWeight: 2,
          },
          hover: {
            fill: [4, 28, 60],
            stroke: 255,
            strokeWeight: 2,
          },
        },
      },
      item: {
        font: {
          fill: 255,
          name: fonts.roboto,
          size: 14,
        },
        setting: {
          default: {
            fill: [4, 54, 95],
            stroke: [1, 255, 255],
            strokeWeight: 2,
          },
          hover: {
            fill: [4, 108, 156],
            stroke: 255,
            strokeWeight: 2,
          },
        },
      }
    }
  };
}
const icons = {
  dt: "\uf15b",
  tk: "\uf085"

};