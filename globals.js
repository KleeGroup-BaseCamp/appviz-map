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
    default: { fill: COLORS[0], stroke: 255, strokeWeight: 2 },
    hover: { fill: COLORS[3], stroke: 255, strokeWeight: 2 },
  },
};

const BACKGROUND_COLOR = [3, 4, 94];

let styles;
const initStyles = () => {
  styles = {
    zones: {
      font: {
        fill: 255,
        name: roboto,
        size: 28,
      },
      setting: {
        default: {
          fill: [0, 0], // Black fill with 0 opacity => No fill
          stroke: 255,
          strokeWeight: 2,
        },
        hover: { fill: COLORS[3], stroke: 255, strokeWeight: 2 },
      },
    },
    groups: {
      font: {
        fill: 255,
        name: roboto,
        size: 16,
      },
      setting: {
        default: {
          fill: COLORS[0],
          stroke: 255,
          strokeWeight: 2,
        },
        hover: { fill: COLORS[3], stroke: 255, strokeWeight: 2 },
      },
    },
    items: {
      font: {
        fill: 255,
        name: roboto,
        size: 14,
      },
      setting: {
        default: {
          fill: COLORS[1],
          stroke: 255,
          strokeWeight: 2,
        },
        hover: { fill: COLORS[3], stroke: 255, strokeWeight: 2 },
      },
    },
    grid: {
      setting: {
        default: {
          fill: 0,
          stroke: 150,
          strokeWeight: 1,
        },
      },
    },
  };
};
