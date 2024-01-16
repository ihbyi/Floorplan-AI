// Floorplan class
class Floorplan {
  constructor(width, height, numberOfRooms) {
    this.width = width;
    this.height = height;
    this.numberOfRooms = numberOfRooms;
    this.rooms = [];
  }

  generate() {
    let x = 0,
      y = 0,
      row = 1;
    for (let i = 0; i < this.numberOfRooms; i++) {
      const width = Math.floor(this.randomize(2, this.width / 2));
      let height = Math.floor(this.randomize(2, this.height / 2));

      if (width + x > this.width) {
        x = 0;
        y += this.checkLongesRoom(row);
        row += 1;
      }

      if (height + y > this.height) {
        const MAX_ATTEMPTS = 5;
        let j = 0;
        while (j < MAX_ATTEMPTS || height + y <= this.height) {
          j++;
          height = Math.floor(this.randomize(2, this.height / 2));
        }

        if (height + y > this.height) {
          height = this.height - y;
        }
      }

      const room = {
        row,
        x,
        y,
        width,
        height,
      };
      this.rooms.push(room);
      x += width;
    }

    return this.rooms;
  }

  randomize(min, max) {
    return Math.random() * (max - min) + min;
  }

  checkLongesRoom(row) {
    let longest = 0;
    this.rooms.forEach((room) => {
      if (room.row != row) return;
      longest = Math.max(longest, room.height);
    });

    return longest;
  }
}

const ai = (numberOfRooms, width, height) => {
  let floorplan = new Floorplan(width, height, numberOfRooms);
  return floorplan.generate();
};

export { ai };
