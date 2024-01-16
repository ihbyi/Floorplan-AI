import { floorplan } from './lib/floorplan.js';
import { ai } from './lib/algorithm.js';

const width = 20;
const height = 10;

const ask = () => {
  let number = 0;
  while (number <= 0 || number >= 10) {
    number = prompt('ادخل عدد الغرف (0 < الغرف < 10)', 4) * 1;
    if (number.toLowerCase == 'nan' || number >= 10) number = 0;
  }
  return number;
};

const rooms = ai(ask(), width, height);
console.log(rooms);

const mapping = {
  settings: {
    width,
    height,
  },
  rooms,
};

floorplan.draw(mapping);
