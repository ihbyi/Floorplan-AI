const floorplan = {
  rooms: {
    walls: (walls) => {
      if (!walls) return false;

      const wallsEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      );
      wallsEl.classList.add('walls');

      const wallEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );

      let path = '';
      walls.forEach((wall) => {
        const { x, y, orientation, to } = wall;

        let shortOrientation = orientation == 'vertical' ? 'V' : 'H';
        path += `M${x} ${y} ${shortOrientation}${to} `;
      });
      wallEl.setAttribute('d', path);

      wallsEl.appendChild(wallEl);
      return wallsEl;
    },
  },
};
