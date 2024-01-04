import { floorplan } from './lib/floorplan.js';
const mapping = {
  settings: {
    width: 421,
    height: 600,
    enterance: [
      {
        x: 329.983,
        y: 600,
        orientation: 'horizontal',
        to: 308.983,
        openSide: 'up',
      },
    ],
  },
  rooms: [
    {
      id: 'top-bedroom',
      walls: [
        {
          x: 0,
          y: 0,
          orientation: 'vertical',
          to: 123.9,
        },
        {
          x: 44.1,
          y: 0,
          orientation: 'vertical',
          to: 123.9,
        },
        {
          x: 0,
          y: 0,
          orientation: 'horizontal',
          to: 44.1,
        },
        {
          x: 0,
          y: 123.9,
          orientation: 'horizontal',
          to: 44.1,
        },
        {
          x: 0,
          y: 65.1,
          orientation: 'horizontal',
          to: 44.1,
        },
        {
          x: 0,
          y: 90.3,
          orientation: 'horizontal',
          to: 44.1,
        },
      ],
      windows: [
        {
          x: 33,
          y: 90.3,
          orientation: 'horizontal',
          to: 40,
          type: 'vent',
          location: 'bottom',
        },
      ],
      doors: [
        {
          x: 44.1,
          y: 15,
          orientation: 'vertical',
          to: 35,
          openSide: 'left',
        },
        {
          x: 40,
          y: 65.1,
          orientation: 'horizontal',
          to: 28,
          openSide: 'down',
        },
      ],
      extras: [
        {
          x1: 0,
          y1: 90.3,
          x2: 44.1,
          y2: 123.9,
        },
      ],
      data: {
        en: {
          name: 'Bed Room',
        },
        ar: {
          name: 'غرفة نوم',
        },
      },
    },
    {
      id: 'main-kitchen',
      walls: [
        {
          x: 44.1,
          y: 123.9,
          orientation: 'horizontal',
          to: 85.785,
        },
        {
          x: 85.785,
          y: 123.9,
          orientation: 'vertical',
          to: 75,
        },
        {
          x: 85.785,
          y: 90.3,
          orientation: 'horizontal',
          to: 142.515,
        },
        {
          x: 140.515,
          y: 90.3,
          orientation: 'vertical',
          to: 0,
        },
        {
          x: 140.515,
          y: 0,
          orientation: 'horizontal',
          to: 44.1,
        },
      ],
      windows: [
        {
          x: 116.515,
          y: 90.3,
          orientation: 'horizontal',
          to: 123.515,
          type: 'normal',
          location: 'bottom',
        },
        {
          x: 128.515,
          y: 90.3,
          orientation: 'horizontal',
          to: 136.515,
          type: 'normal',
          location: 'bottom',
        },
        {
          x: 140.515,
          y: 75,
          orientation: 'vertical',
          to: 15,
          type: 'normal',
          location: 'right',
        },
        {
          x: 44.1,
          y: 93,
          orientation: 'vertical',
          to: 121,
          type: 'normal',
          location: 'left',
        },
        {
          x: 85.785,
          y: 93,
          orientation: 'vertical',
          to: 121,
          type: 'normal',
          location: 'right',
        },
      ],
      doors: [
        {
          x: 50,
          y: 123.9,
          orientation: 'horizontal',
          to: 70,
          openSide: 'up',
        },
      ],
      data: {
        en: {
          name: 'Main Kitchen',
        },
        ar: {
          name: 'المطبخ الرئيسي',
        },
      },
    },
    {
      id: 'terrass',
      walls: [
        {
          x: 85.785,
          y: 123.9,
          orientation: 'horizontal',
          to: 226.82,
        },
        {
          x: 85.785,
          y: 0,
          orientation: 'horizontal',
          to: 226.82,
        },
      ],
      levels: [
        {
          x: 216.82,
          y: 47.25,
          orientation: 'vertical',
          to: 123.9,
        },
      ],
      data: {
        en: {
          name: 'Terrass',
        },
        ar: {
          name: 'جلسة خارجية',
        },
      },
    },
    {
      id: 'swimming-pool',
      walls: [
        {
          x: 226.82,
          y: 0,
          to: 346.805,
        },
      ],
      levels: [
        {
          x: 336.805,
          y: 0,
          orientation: 'vertical',
          to: 65.1,
        },
        {
          x: 226.82,
          y: 65.1,
          orientation: 'horizontal',
          to: 106.835,
        },
        {
          x: 226.82,
          y: 47.25,
          orientation: 'vertical',
          size: 7,
          to: 65.25,
        },
        {
          x: 233.82,
          y: 47.25,
          orientation: 'vertical',
          size: 7,
          to: 65.25,
        },
      ],
      data: {
        en: {
          name: 'Swimming Pool',
        },
        ar: {
          name: 'حوض سباحة',
        },
      },
    },
    {
      id: 'courtyard',
      levels: [
        {
          x: 226.82,
          y: 111.9,
          orientation: 'horizontal',
          to: 116.835,
        },
      ],
      data: {
        en: {
          name: 'Courtyard',
        },
        ar: {
          name: 'فناء داخلي',
        },
      },
    },
    {
      id: 'living-room-bathroom',
      walls: [
        {
          x: 0,
          y: 123.9,
          orientation: 'vertical',
          to: 224.7,
        },
        {
          x: 44.1,
          y: 123.9,
          orientation: 'vertical',
          to: 224.7,
        },
        {
          x: 0,
          y: 224.7,
          orientation: 'horizontal',
          to: 44.1,
        },
        {
          x: 0,
          y: 157.5,
          orientation: 'horizontal',
          to: 44.1,
        },
      ],
      windows: [
        {
          x: 33,
          y: 123.9,
          orientation: 'horizontal',
          to: 40,
          type: 'vent',
          location: 'up',
        },
      ],
      doors: [
        {
          x: 40,
          y: 157.5,
          orientation: 'horizontal',
          to: 28,
          openSide: 'up',
        },
        {
          x: 44.1,
          y: 194.7,
          orientation: 'vertical',
          to: 214.7,
          type: 'clear',
          openSide: 'left',
          // size: 'small',
        },
      ],
      data: {
        displayName: false,
        en: {
          name: 'Bathroom',
        },
        ar: {
          name: 'دورة مياة',
        },
      },
    },
    {
      id: 'corridor-1',
      walls: [
        {
          x: 44.1,
          y: 224.7,
          orientation: 'horizontal',
          to: 85.785,
        },
        {
          x: 85.785,
          y: 123.9,
          orientation: 'vertical',
          to: 224.7,
        },
      ],
      doors: [
        {
          x: 85.785,
          y: 143.9,
          orientation: 'vertical',
          to: 210,
          type: 'arcFrame',
          // size: 'small',
        },
      ],
      data: {
        displayName: false,
        en: {
          name: 'Corridor',
        },
        ar: {
          name: 'ممر',
        },
      },
    },
    {
      id: 'outer-kitchen',
      walls: [
        {
          x: 85.785,
          y: 224.7,
          orientation: 'horizontal',
          to: 193,
        },
        {
          x: 191.035,
          y: 135.9,
          orientation: 'vertical',
          to: 123.9,
        },
        {
          x: 191.035,
          y: 135.9,
          orientation: 'vertical',
          to: 170,
          type: 'gapped',
        },
      ],
      data: {
        en: {
          name: 'Kitchen',
        },
        ar: {
          name: 'مطبخ خارجي',
        },
      },
    },
    {
      id: 'living-room',
      walls: [
        {
          x: 226.82,
          y: 123.9,
          orientation: 'horizontal',
          to: 336.805,
        },
        {
          x: 334.805,
          y: 123.9,
          orientation: 'vertical',
          to: 242.7,
        },
        {
          x: 336.805,
          y: 242.7,
          orientation: 'horizontal',
          to: 189.035,
        },
        {
          x: 191.035,
          y: 242.7,
          orientation: 'vertical',
          to: 224.7,
        },
      ],
      levels: [
        {
          x: 193.035,
          y: 123.9,
          orientation: 'vertical',
          to: 240.9,
        },
        {
          x: 203.035,
          y: 126,
          orientation: 'horizontal',
          to: 304.215,
        },
      ],
      windows: [
        {
          x: 226.82,
          y: 123.9,
          orientation: 'horizontal',
          to: 247.874,
          location: 'up',
        },
        {
          x: 226.82,
          y: 242.7,
          orientation: 'horizontal',
          to: 247.874,
          location: 'bottom',
        },
        {
          x: 254.874,
          y: 123.9,
          orientation: 'horizontal',
          to: 275.874,
          location: 'up',
        },
        {
          x: 254.874,
          y: 242.7,
          orientation: 'horizontal',
          to: 275.874,
          location: 'bottom',
        },
        {
          x: 282.928,
          y: 123.9,
          orientation: 'horizontal',
          to: 303.983,
          location: 'up',
        },
        {
          x: 282.928,
          y: 242.7,
          orientation: 'horizontal',
          to: 303.983,
          location: 'bottom',
        },
      ],
      doors: [
        {
          x: 329.983,
          y: 123.9,
          orientation: 'horizontal',
          to: 308.983,
          openSide: 'down',
        },
      ],
      data: {
        en: {
          name: 'Living Room',
        },
        ar: {
          name: 'الصالة الرئيسية',
        },
      },
    },
    {
      id: 'guest-room',
      walls: [
        {
          x: 0,
          y: 226,
          orientation: 'vertical',
          to: 354.9,
        },
        {
          x: 0,
          y: 354.9,
          orientation: 'horizontal',
          to: 193,
        },
        {
          x: 191.035,
          y: 354.9,
          orientation: 'vertical',
          to: 242.7,
        },
        {
          x: 31.975,
          y: 290.9,
          orientation: 'horizontal',
          to: 73.945,
        },
        {
          x: 71.945,
          y: 290.9,
          orientation: 'vertical',
          to: 327.7,
        },
        {
          x: 71.945,
          y: 325.7,
          orientation: 'horizontal',
          to: 28.5,
        },
        {
          x: 30.5,
          y: 325.7,
          orientation: 'vertical',
          to: 288.9,
        },
        {
          x: 72.4,
          y: 288.5,
          orientation: 'horizontal',
          to: 28.7,
          type: 'dashed',
        },
        {
          x: 28.7,
          y: 288.5,
          orientation: 'vertical',
          to: 252.02,
          type: 'dashed',
        },
        {
          x: 28.7,
          y: 252.02,
          orientation: 'horizontal',
          to: 73.4,
          type: 'dashed',
        },
        {
          x: 73.4,
          y: 288.5,
          orientation: 'vertical',
          to: 252.02,
          type: 'dashed',
        },
      ],
      doors: [
        {
          x: 105.785,
          y: 224.7,
          orientation: 'horizontal',
          to: 171.035,
          type: 'arcFrame',
        },
        {
          x: 71.945,
          y: 301.9,
          orientation: 'vertical',
          to: 320.7,
          type: 'sliding',
          size: 'small',
        },
        {
          x: 191.035,
          y: 314.9,
          orientation: 'vertical',
          to: 262.7,
          type: 'sliding',
        },
      ],
      extras: [
        {
          x1: 28.975,
          y1: 290.9,
          x2: 72.945,
          y2: 327.7,
        },
        {
          x1: 28.7,
          y1: 252.02,
          x2: 73.4,
          y2: 288.5,
        },
      ],
      data: {
        en: {
          name: 'Guest Room',
        },
        ar: {
          name: 'صالة الضيوف',
        },
      },
    },
    {
      id: 'courtyard-entrance',
      levels: [
        {
          x: 218.035,
          y: 262.7,
          orientation: 'vertical',
          to: 314.9,
          size: 6,
        },
      ],
      data: {
        en: {
          name: 'Courtyard',
        },
        ar: {
          name: 'فناء داخلي',
        },
      },
    },
    {
      id: 'main-guest-room-bathroom',
      walls: [
        {
          x: 0,
          y: 354.9,
          orientation: 'vertical',
          to: 455.7,
        },
        {
          x: 0,
          y: 455.7,
          orientation: 'horizontal',
          to: 46.1,
        },
        {
          x: 44.1,
          y: 455.7,
          orientation: 'vertical',
          to: 354.9,
        },
        {
          x: 0,
          y: 422.1,
          orientation: 'horizontal',
          to: 44.1,
        },
      ],
      windows: [
        {
          x: 33,
          y: 455.7,
          orientation: 'horizontal',
          to: 40,
          type: 'vent',
          location: 'bottom',
        },
      ],
      doors: [
        {
          x: 40,
          y: 422.1,
          orientation: 'horizontal',
          to: 28,
          openSide: 'down',
        },
        {
          x: 44.1,
          y: 384.9,
          orientation: 'vertical',
          to: 364.9,
          type: 'clear',
          openSide: 'left',
        },
      ],
      data: {
        displayName: false,
        en: {
          name: 'bathroom',
        },
        ar: {
          name: 'دورة مياه',
        },
      },
    },
    {
      id: 'corridor-2',
      walls: [
        {
          x: 44.1,
          y: 354.9,
          orientation: 'horizontal',
          to: 85.785,
        },
        {
          x: 85.785,
          y: 354.9,
          orientation: 'vertical',
          to: 457,
        },
        {
          x: 44.1,
          y: 455.7,
          orientation: 'horizontal',
          to: 87.785,
        },
      ],
      data: {
        displayName: false,
        en: {
          name: 'Corridor',
        },
        ar: {
          name: 'ممر',
        },
      },
    },
    {
      id: 'dining-room',
      walls: [
        {
          x: 85.785,
          y: 455.7,
          orientation: 'horizontal',
          to: 193.035,
        },
        {
          x: 191.035,
          y: 455.7,
          orientation: 'vertical',
          to: 354.9,
        },
      ],
      doors: [
        {
          x: 150.035,
          y: 455.7,
          orientation: 'horizontal',
          to: 184.035,
          type: 'sliding',
        },
        {
          x: 85.785,
          y: 369.6,
          orientation: 'vertical',
          to: 435.7,
          type: 'arcFrame',
        },
        {
          x: 105.785,
          y: 354.9,
          orientation: 'horizontal',
          to: 171.035,
          type: 'arcFrame',
        },
      ],
      data: {
        en: {
          name: 'Dining Room',
        },
        ar: {
          name: 'صالة طعام',
        },
      },
    },
    {
      id: 'main-guest-room',
      walls: [
        {
          x: 191.035,
          y: 455.7,
          orientation: 'horizontal',
          to: 336.805,
        },
        {
          x: 334.805,
          y: 455.7,
          orientation: 'vertical',
          to: 334.7,
        },
        {
          x: 334.805,
          y: 336.7,
          orientation: 'horizontal',
          to: 191.035,
        },
      ],
      windows: [
        {
          x: 226.82,
          y: 455.7,
          orientation: 'horizontal',
          to: 247.874,
          location: 'bottom',
        },
        {
          x: 226.82,
          y: 336.7,
          orientation: 'horizontal',
          to: 247.874,
          location: 'top',
        },
        {
          x: 254.82,
          y: 455.7,
          orientation: 'horizontal',
          to: 275.874,
          location: 'bottom',
        },
        {
          x: 254.82,
          y: 336.7,
          orientation: 'horizontal',
          to: 275.874,
          location: 'top',
        },
        {
          x: 282.82,
          y: 455.7,
          orientation: 'horizontal',
          to: 303.983,
          location: 'bottom',
        },
        {
          x: 282.82,
          y: 336.7,
          orientation: 'horizontal',
          to: 303.983,
          location: 'top',
        },
      ],
      doors: [
        {
          x: 329.983,
          y: 455.7,
          orientation: 'horizontal',
          to: 308.983,
          openSide: 'up',
        },
        {
          x: 191.035,
          y: 440.7,
          orientation: 'vertical',
          to: 420.7,
          type: 'clear',
          openSide: 'left',
        },
      ],
      data: {
        en: {
          name: 'Main Guest Room',
        },
        ar: {
          name: 'مجلس الرجال',
        },
      },
    },
    {
      id: 'driver-room',
      walls: [
        {
          x: 0,
          y: 455.7,
          orientation: 'vertical',
          to: 600,
        },
        {
          x: 44.1,
          y: 455.7,
          orientation: 'vertical',
          to: 600,
        },
        {
          x: 0,
          y: 600,
          orientation: 'horizontal',
          to: 44.1,
        },
        {
          x: 0,
          y: 493.7,
          orientation: 'horizontal',
          to: 44.1,
        },
        {
          x: 0,
          y: 520.8,
          orientation: 'horizontal',
          to: 44.1,
        },
      ],
      windows: [
        {
          x: 44.1,
          y: 460.7,
          orientation: 'vertical',
          to: 488.7,
          location: 'left',
        },
        {
          x: 33,
          y: 493.7,
          orientation: 'horizontal',
          to: 40,
          location: 'top',
        },
      ],
      doors: [
        {
          x: 40,
          y: 520.8,
          orientation: 'horizontal',
          to: 28,
          openSide: 'up',
        },
      ],
      extras: [
        {
          x1: 0,
          y1: 455.7,
          x2: 44.1,
          y2: 493.7,
        },
      ],
      data: {
        en: {
          name: 'Driver Room',
        },
        ar: {
          name: 'غرفة السائق',
        },
      },
    },
    {
      id: 'guest-room-2',
      walls: [
        {
          x: 85.785,
          y: 455.7,
          orientation: 'vertical',
          to: 495.7,
        },
        {
          x: 85.785,
          y: 493.7,
          orientation: 'horizontal',
          to: 149.515,
        },
        {
          x: 147.515,
          y: 493.7,
          orientation: 'vertical',
          to: 600,
        },
        {
          x: 44.1,
          y: 600,
          orientation: 'horizontal',
          to: 149.515,
        },
      ],
      windows: [
        {
          x: 85.785,
          y: 460.7,
          orientation: 'vertical',
          to: 488.7,
          location: 'right',
        },
        {
          x: 113.785,
          y: 493.7,
          orientation: 'horizontal',
          to: 125.785,
        },
        {
          x: 131.785,
          y: 493.7,
          orientation: 'horizontal',
          to: 143.785,
        },
        {
          x: 147.515,
          y: 510.7,
          orientation: 'vertical',
          to: 535.033,
          location: 'right',
        },
        {
          x: 147.515,
          y: 535.033,
          orientation: 'vertical',
          to: 559.366,
          location: 'right',
        },
        {
          x: 147.515,
          y: 559.366,
          orientation: 'vertical',
          to: 583.7,
          location: 'right',
        },
      ],
      data: {
        en: {
          name: 'Guest Room',
        },
        ar: {
          name: 'صالة الضيوف',
        },
      },
    },
  ],
  parking: {
    id: 'parking',
    x: 147.515,
    y: 600,
    cars: 2,
  },
};

floorplan.draw(mapping);
