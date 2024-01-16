const getOrientation = (orientation, reverse = false) => {
  if (reverse) return orientation == 'vertical' ? 'H' : 'V';
  return orientation == 'vertical' ? 'V' : 'H';
};

const calculateDoorFrame = (door) => {
  const { x, y, orientation, to, openSide = 'up' } = door;

  let length = 0;

  if (orientation == 'vertical') {
    length = Math.min(Math.abs(y - to), 17);

    if (openSide == 'left') {
      length = x - length;
    } else if (openSide == 'right') {
      length = x + length;
    }
  } else if (orientation == 'horizontal') {
    length = Math.min(Math.abs(x - to), 17);

    if (openSide == 'up') {
      length = y - length;
    } else if (openSide == 'down') {
      length = y + length;
    }
  }

  return length;
};

const drawDoorAngle = (door, length) => {
  const { x, y, orientation, to } = door;

  let pos = `M ${x} ${to}`;
  if (orientation == 'horizontal') pos = `M ${to} ${y}`;

  let qCurve = `Q${length} ${to} ${length} ${y}`;
  if (orientation == 'horizontal') qCurve = `Q${to} ${length} ${x} ${length}`;
  return `${pos} ${qCurve}`;
};

const RATIO = 40;

const floorplan = {
  draw: function (mapping) {
    console.log(`⚒ Working on mapping`);

    const { width, height } = mapping.settings;
    const svg = this.init(width * RATIO, height * RATIO);
    const rooms = this.rooms.draw(mapping.rooms || false);

    const parking = this.parking(mapping.parking || false);

    if (rooms) svg.appendChild(rooms);
    if (parking) svg.appendChild(parking);
    this.display(svg);
  },

  init: function (width, height, enterance = undefined) {
    console.log('⚒ Initializing');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('xmlns:xlink', `http://www.w3.org/1999/xlink`);
    svg.setAttribute('preserveAspectRatio', `xMidYMid meet`);

    const style = document.createElement('style');
    style.innerHTML = css;
    svg.appendChild(style);

    const pathEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    const path = `M0 0 V${height} H${width} V0 H0`;

    pathEl.setAttribute('d', path);
    pathEl.id = 'plan';
    svg.appendChild(pathEl);

    if (enterance) {
      svg.appendChild(this.rooms.doors(enterance));
    }
    console.log('✔ Initializing');
    return svg;
  },

  display: (svg) => {
    document.querySelector('body').appendChild(svg);
  },

  rooms: {
    draw: function (rooms) {
      if (!rooms) return false;
      console.log('⚒ Drawing rooms');

      const roomsEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      );
      roomsEl.id = 'rooms';

      rooms.forEach((room) => {
        const roomEl = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        );
        roomEl.setAttribute('x', room.x * RATIO);
        roomEl.setAttribute('y', room.y * RATIO);
        roomEl.setAttribute('width', room.width * RATIO);
        roomEl.setAttribute('height', room.height * RATIO);
        roomEl.id = 'wall';
        roomsEl.appendChild(roomEl);
      });

      console.log('✔ Drawing rooms');
      return roomsEl;
    },

    room: function (data) {
      console.log(`🎨 Drawing ${data.id}`);
      this.id = data.id;

      const room = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      room.id = data.id;
      room.classList.add('room');

      const walls = this.walls(data.walls || false);
      if (walls) room.appendChild(walls);

      const levels = this.levels(data.levels);
      if (levels) room.appendChild(levels);

      const windows = this.windows(data.windows);
      if (windows) room.appendChild(windows);

      const doors = this.doors(data.doors);
      if (doors) room.appendChild(doors);

      const extras = this.extras(data.extras);
      if (extras) room.appendChild(extras);

      return room;
    },

    walls: function (walls) {
      if (!walls) return false;

      const wallsEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      );

      wallsEl.classList.add('walls');

      let path = '';
      walls.forEach((wall) => {
        const wallEl = this.wall(wall);
        wallsEl.appendChild(wallEl);
      });
      return wallsEl;

      // More efficient approach in file efficient.js
    },

    windows: (windows) => {
      if (!windows) return false;

      const windowsEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      );
      windowsEl.classList.add('windows');

      windows.forEach((window) => {
        const groupEl = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'g'
        );
        const line1 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );

        const line2 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        line2.id = `line-2`;

        const {
          x,
          y,
          orientation,
          to,
          type = 'normal',
          location = 'top',
        } = window;

        let line2Coords;
        if (orientation == 'horizontal') {
          if (x < to) {
            line2Coords = {
              x: x + 1,
              y,
              to: to - 1,
            };
          } else if (x > to) {
            line2Coords = {
              x: x - 1,
              y,
              to: to + 1,
            };
          }
        } else if (orientation == 'vertical') {
          if (y < to) {
            line2Coords = {
              x,
              y: y + 1,
              to: to - 1,
            };
          } else if (y > to) {
            line2Coords = {
              x,
              y: y - 1,
              to: to + 1,
            };
          }
        }

        const shortOrientation = getOrientation(orientation);
        const path = `M${x} ${y} ${shortOrientation}${to}`;

        const path2 = `M${line2Coords.x} ${line2Coords.y} ${shortOrientation}${line2Coords.to}`;

        line1.setAttribute('d', path);
        line2.setAttribute('d', path2);

        groupEl.classList.add(shortOrientation.toLowerCase());
        groupEl.classList.add(location.charAt(0));
        groupEl.appendChild(line1);
        groupEl.appendChild(line2);
        windowsEl.appendChild(groupEl);
      });

      return windowsEl;
    },

    doors: function (doors) {
      if (!doors) return false;

      const doorsEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      );
      doorsEl.classList.add('doors');

      doors.forEach((data) => {
        const door = this.door(data);
        doorsEl.appendChild(door);
      });

      return doorsEl;
    },

    extras: (extras) => {
      if (!extras) return false;

      const extrasEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      );
      extrasEl.classList.add('extras');

      extras.forEach((extra) => {
        const groupEl = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'g'
        );

        const extraEl = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        groupEl.classList.add('extra');

        const { x1, y1, x2, y2 } = extra;

        const path = `M${x1} ${y1} L${x2} ${y2} M${x1} ${y2} L${x2} ${y1}`;

        extraEl.setAttribute('d', path);
        groupEl.appendChild(extraEl);
        extrasEl.appendChild(groupEl);
      });

      return extrasEl;
    },

    levels: (levels) => {
      if (!levels) return false;

      const levelsEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      );
      levelsEl.classList.add('levels');

      levels.forEach((level) => {
        const levelEl = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        );

        const { x, y, orientation, size = 10, to } = level;

        let height = Math.abs(y - to),
          width = size;
        if (orientation == 'horizontal') {
          width = Math.abs(x - to);
          height = size;
        }

        levelEl.setAttribute('x', x);
        levelEl.setAttribute('y', y);
        levelEl.setAttribute('width', width);
        levelEl.setAttribute('height', height);

        levelsEl.appendChild(levelEl);
      });

      return levelsEl;
    },

    stairs: (stairs) => {},

    wall: (wall) => {
      const { x, y, orientation, to, type = 'normal' } = wall;

      const wallEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

      let shortOrientation = getOrientation(orientation);
      const path = `M${x} ${y} ${shortOrientation}${to} `;

      if (type == 'gapped') wallEl.id = 'gapped';
      else if (type == 'dashed') wallEl.id = 'dashed';
      else if (type == 'parking') wallEl.id = 'parking';
      else if (type == 'border') wallEl.id = 'border';

      wallEl.setAttribute('d', path);

      return wallEl;
    },

    door: (door) => {
      const groupEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      );

      const borderEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      borderEl.id = 'border';

      const { x, y, orientation, to, openSide, type = 'normal' } = door;
      const shortOrientation = getOrientation(orientation);
      const shortOrientationReversed = getOrientation(orientation, true);

      let border = `M${x} ${y} ${shortOrientation}${to}`;
      borderEl.id = 'border';
      borderEl.setAttribute('d', border);
      groupEl.appendChild(borderEl);

      if (type == 'normal') {
        const doorEl = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        const angleEl = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        angleEl.id = 'angle';

        let length = calculateDoorFrame(door);

        let frame = `M${x} ${y} ${shortOrientationReversed}${length}`;

        let angle = drawDoorAngle(door, length);

        doorEl.setAttribute('d', frame);
        angleEl.setAttribute('d', angle);

        groupEl.appendChild(doorEl);
        groupEl.appendChild(angleEl);
      }

      if (type == 'clear') {
        groupEl.classList.add('clear');
        groupEl.classList.add(openSide);
        if (door.size == 'small') groupEl.classList.add('small');

        const frame = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );

        const clearFrame = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );

        const path = `M${x} ${y} ${shortOrientation}${to}`;

        frame.setAttribute('d', path);
        frame.id = 'frame';
        clearFrame.setAttribute('d', path);
        clearFrame.id = 'clear-frame';

        groupEl.appendChild(frame);
        groupEl.appendChild(clearFrame);
      }

      if (type == 'arcFrame') {
        groupEl.classList.add('arcFrame');
        groupEl.classList.add(shortOrientation.toLowerCase());
        if (door.size == 'small') groupEl.classList.add('small');

        const frame1 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );

        const frame2 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );

        const path = `M${x} ${y} ${shortOrientation}${to}`;

        frame1.setAttribute('d', path);
        frame1.id = 'frame-1';
        frame2.setAttribute('d', path);
        frame2.id = 'frame-2';

        groupEl.appendChild(frame1);
        groupEl.appendChild(frame2);
      }

      if (type == 'sliding') {
        groupEl.classList.add('sliding');
        groupEl.classList.add(shortOrientation.toLowerCase());
        if (door.size == 'small') groupEl.classList.add('small');

        const frame1 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        const frame2 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        const frame3 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        const frame4 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );

        const handle1 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        );
        const handle2 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        );

        let handle1Attr = {
          x: 0,
          y: 0,
        };

        let handle2Attr = {
          x: 0,
          y: 0,
        };

        if (orientation == 'vertical') {
          handle1Attr = {
            x: x - 2,
            y: Math.min(y, to) + (door.size == 'small' ? 3 : 10),
          };

          handle2Attr = {
            x: x - 2,
            y: Math.max(y, to) - (door.size == 'small' ? 5 : 10),
          };
        } else if (orientation == 'horizontal') {
          handle1Attr = {
            x: Math.min(x, to) + (door.size == 'small' ? 3 : 10),
            y: y - 2,
          };

          handle2Attr = {
            x: Math.max(x, to) - (door.size == 'small' ? 5 : 10),
            y: y - 2,
          };
        }

        handle1.setAttribute('x', handle1Attr.x);
        handle1.setAttribute('y', handle1Attr.y);

        handle2.setAttribute('x', handle2Attr.x);
        handle2.setAttribute('y', handle2Attr.y);

        const frame = `M${x} ${y} ${shortOrientation}${to}`;

        frame1.setAttribute('d', frame);
        frame1.id = 'frame-1';
        frame2.setAttribute('d', frame);
        frame2.id = 'frame-2';
        frame3.setAttribute('d', frame);
        frame3.id = 'frame-3';
        frame4.setAttribute('d', frame);
        frame4.id = 'frame-4';

        handle1.id = 'handle';
        handle2.id = 'handle';

        groupEl.appendChild(frame1);
        groupEl.appendChild(frame2);
        groupEl.appendChild(frame3);
        groupEl.appendChild(frame4);
        groupEl.appendChild(handle1);
        groupEl.appendChild(handle2);
      }

      return groupEl;
    },
  },

  parking: function (data) {
    if (!data) return false;

    const CAR_HEIGHT = 108;
    const CAR_WIDTH = 43;
    const PARKING_Y_OFFSET = data.y - 9;
    const NORMAL_SLAB_WIDTH = 7;
    const LAST_SLAB_WIDTH = 11;
    const PARKING_LENGTH = data.y - CAR_HEIGHT;
    const CORNER_SLAB = 12;

    const parkingEl = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    parkingEl.classList.add('parkings');

    let currentX = data.x;
    let endOfSlab2;

    for (let i = 0; i < data.cars; i++) {
      const carEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      carEl.id = `car-${i}`;

      //MARGINS (SLABS)

      const marginEl1 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      marginEl1.id = 'slab';
      const marginEl2 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      marginEl2.id = 'slab';

      let slabWidth = NORMAL_SLAB_WIDTH;
      const startOfSlab1 = currentX;
      const marginPath1 = `M${startOfSlab1} ${data.y - 9} H${
        currentX + slabWidth
      }`;

      currentX += CAR_WIDTH + NORMAL_SLAB_WIDTH;

      slabWidth = i == data.cars - 1 ? LAST_SLAB_WIDTH : NORMAL_SLAB_WIDTH;

      const startOfSlab2 = currentX;
      const marginPath2 = `M${startOfSlab2} ${PARKING_Y_OFFSET} H${
        currentX + slabWidth
      }`;
      currentX += NORMAL_SLAB_WIDTH;

      marginEl1.setAttribute('d', marginPath1);
      marginEl2.setAttribute('d', marginPath2);

      //TRIANGLES

      const diagonalLine1El = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

      diagonalLine1El.id = 'diagonal';

      const diagonalLine2El = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      diagonalLine2El.id = 'diagonal';

      endOfSlab2 = startOfSlab2 + slabWidth;
      const middleOfParking = (startOfSlab1 + endOfSlab2) / 2;

      const diagonalPath1 = `M${startOfSlab1} ${PARKING_Y_OFFSET} L${middleOfParking} ${PARKING_LENGTH}`;

      const diagonalPath2 = `M${middleOfParking} ${PARKING_LENGTH} L${endOfSlab2} ${PARKING_Y_OFFSET}`;

      diagonalLine1El.setAttribute('d', diagonalPath1);
      diagonalLine2El.setAttribute('d', diagonalPath2);

      //LINES IN THE MIDDLE OF TRIANGLES
      const middleLine = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

      middleLine.id = 'middle-line';

      const middleLinePath = `M${middleOfParking} ${PARKING_Y_OFFSET} V${PARKING_LENGTH}`;

      middleLine.setAttribute('d', middleLinePath);

      //DIVIDER ON RIGHT
      if (i != data.cars - 1) {
        const divider = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );

        divider.id = 'divider';

        const dividerPath = `M${endOfSlab2} ${PARKING_Y_OFFSET} V${PARKING_LENGTH}`;

        divider.setAttribute('d', dividerPath);
        carEl.appendChild(divider);
      }

      carEl.appendChild(marginEl1);
      carEl.appendChild(marginEl2);
      carEl.appendChild(diagonalLine1El);
      carEl.appendChild(diagonalLine2El);
      carEl.appendChild(middleLine);
      parkingEl.appendChild(carEl);
    }

    //WALLS
    const wallsData = [
      {
        x: data.x,
        y: data.y,
        orientation: 'horizontal',
        to: endOfSlab2,
        type: 'border',
      },
      {
        x: data.x,
        y: PARKING_LENGTH,
        orientation: 'horizontal',
        to: endOfSlab2,
        type: 'parking',
      },
      {
        x: endOfSlab2,
        y: PARKING_LENGTH,
        orientation: 'vertical',
        to: PARKING_Y_OFFSET,
        type: 'parking',
      },
      {
        x: endOfSlab2,
        y: PARKING_LENGTH,
        orientation: 'vertical',
        to: PARKING_LENGTH + CORNER_SLAB,
      },
      {
        x: data.x,
        y: data.y,
        orientation: 'vertical',
        to: PARKING_Y_OFFSET,
      },
      {
        x: endOfSlab2,
        y: data.y,
        orientation: 'vertical',
        to: PARKING_Y_OFFSET - 2, // (-2 to fill corner gap)
      },
    ];

    const walls = this.rooms.walls(wallsData);

    parkingEl.appendChild(walls);

    return parkingEl;
  },
};

const css = `#plan {
          fill: none;
          stroke: black;
          stroke-width: 4;
        }
        
        #border {
          fill: none;
          stroke: white !important;
          stroke-width: 4.6;
          stroke-dasharray: 0;
        }
        
        .walls path,
        .wall,
        #wall {
          fill: #9ae9ff;
          stroke: black;
          stroke-width: 4;
        }

        .walls rect.clear {
          fill: none;
          stroke: black;
          stroke-width: 0.5;
        }
        
        .walls #gapped {
          stroke-width: 4;
          stroke-dasharray: 4 4;
          stroke-dashoffset: 4;
        }

        .walls #dashed {
          stroke-width: .5;
          stroke-dasharray: 8  4;
        }

        .walls #parking{
          stroke-dasharray: 10 10;
          stroke-width: 0.5;
        }

        .windows path,
        .windows use {
          fill: none;
          stroke: white;
        }
        
        .windows .v path {
          transform: translateX(1.2px)
        }
        
        .windows .v #line-2 {
          transform: translateX(-.4px);
        }
        
        .windows .v.r path {
          transform: translateX(-1px)
        }
        
        .windows .v.r #line-2 {
          transform: translateX(.4px);
        }
        
        .windows .h path {
          transform: translateY(1.2px)
        }
        
        .windows .h #line-2 {
          transform: translateY(0px);
        }
        
        .windows .h.b path {
          transform: translateY(-1.2px)
        }
        
        .windows .h.b #line-2 {
          transform: translateY(0px);
        }

        .doors .clear *, {
          stroke-width: 1;
          stroke: black;
          fill: none;
        }
        
        .doors .clear #clear-frame {
          stroke-width: 0.5;
          stroke-dasharray: 10 5;
          stroke-dashoffset: 2;
        }
        
        .doors .clear.small #clear-frame {
          stroke-dasharray: 7 5;
          stroke-dashoffset: 3.5;
        }
        
        .doors .clear.left #frame {
          transform: translateX(1.5px);
        }
        
        .doors .clear.left #clear-frame {
          transform: translateX(-1.5px);
        }
        
        .doors .clear.right #frame {
          transform: translateX(-1.5px);
        }
        
        .doors .clear.right #clear-frame {
          transform: translateX(1.5px);
        }
        
        .doors .clear.up #frame {
          transform: translateY(1.5px);
        }
        
        .doors .clear.up #clear-frame {
          transform: translateY(-1.5px);
        }
        
        .doors .clear.down #frame {
          transform: translateY(-1.5px);
        }
        
        .doors .clear.down #clear-frame {
          transform: translateY(1.5px);
        }
        
        .doors .arcFrame {
          stroke-width: 0.5;
          stroke-dasharray: 10 5;
          stroke-dashoffset: 2;
        }
        
        .doors .arcFrame.small {
          stroke-width: 0.5;
          stroke-dasharray: 2 2;
          stroke-dashoffset: 3;
        }
        
        .doors .arcFrame.v #frame-1 {
          transform: translateX(-1.75px);
        }
        
        .doors .arcFrame.v #frame-2 {
          transform: translateX(1.75px);
        }
        
        .doors .arcFrame.h #frame-1 {
          transform: translateY(-1.75px);
        }
        
        .doors .arcFrame.h #frame-2 {
          transform: translateY(1.75px);
        }

        .doors .sliding {
          stroke-width: 0.5;
        }
        
        .doors .sliding.v #handle {
          transform: translateX(1px);
          width: 2px;
          height: 1px;
        }
        
        .doors .sliding.h #handle {
          transform: translateY(1px);
          width: 1px;
          height: 2px;
        }
        
        .doors .sliding.v #frame-1 {
          transform: translateX(1.75px);
        }
        
        .doors .sliding.v #frame-2 {
          transform: translateX(.75px);
        }
        
        .doors .sliding.v #frame-3 {
          transform: translateX(-1.75px);
        }
        
        .doors .sliding.v #frame-4 {
          transform: translateX(-.75px);
        }

        .doors .sliding.h #frame-1 {
          transform: translateY(1.75px);
        }
        
        .doors .sliding.h #frame-2 {
          transform: translateY(.75px);
        }
        
        .doors .sliding.h #frame-3 {
          transform: translateY(-1.75px);
        }
        
        .doors .sliding.h #frame-4 {
          transform: translateY(-.75px);
        }

        
        .doors path {
          fill: none;
          stroke: black;
        }

        .doors #angle {
          fill: none;
          stroke-width: 0.2;
          stroke: rgba(0, 0, 0, 0.5);
        }

        .stairs path {
          fill: none;
          stroke: black;
          stroke-width: 0.5;
          stroke-dasharray: 4 3;
        }

        .stairs path.h {
          stroke-dasharray: 4 4;
        }

        .extras path {
          fill: none;
          stroke: black;
          stroke-width: 0.5;
        }
        
        .levels rect {
          fill: none;
          stroke: black;
          stroke-width: 0.5;
        }
        
        .parkings #slab {
          fill: none;
          stroke: black;
          stroke-width: 4;
        }
        
        .parkings #diagonal {
          fill: none;
          stroke: black;
          stroke-width: .4;
        }
        
        .parkings #middle-line {
          fill: none;
          stroke: black;
          stroke-dasharray: 10 10;
          stroke-width: 0.5;
        }
        
        .parkings #divider {
          fill: none;
          stroke: black;
          stroke-width: 0.5;
        }

        text {
          font: bold 6px sans-serif;
        }`;

export { floorplan };
