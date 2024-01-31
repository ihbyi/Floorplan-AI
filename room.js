class Room {
    constructor(id, area) {
      this.id = id;
      this.area = area;
      this.width = Math.sqrt(area); // You may customize how you calculate width and height based on the area
      this.height = area / this.width;
    }
  }
  
  class FloorPlan {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.rooms = [];
    }
  
    addRoom(room) {
      this.rooms.push(room);
    }
  
    packRooms() {
      this.rooms.sort((a, b) => b.area - a.area); // Sort rooms in descending order of area
  
      for (const room of this.rooms) {
        this.placeRoom(room);
      }
    }
  
    placeRoom(room) {
      for (let y = 0; y <= this.height - room.height; y++) {
        for (let x = 0; x <= this.width - room.width; x++) {
          if (this.isSpaceAvailable(x, y, room.width, room.height)) {
            room.x = x;
            room.y = y;
            return;
          }
        }
      }
      // If no space is found, handle accordingly (e.g., skip the room or resize the floor plan)
    }
  
    isSpaceAvailable(x, y, width, height) {
      for (const existingRoom of this.rooms) {
        if (
          x < existingRoom.x + existingRoom.width &&
          x + width > existingRoom.x &&
          y < existingRoom.y + existingRoom.height &&
          y + height > existingRoom.y
        ) {
          return false; // Space is not available
        }
      }
      return true; // Space is available
    }
  }
  
  // Example usage:
  const floorPlan = new FloorPlan(50, 50); // Specify the dimensions of the floor plan
  const room1 = new Room(1, 20);
  const room2 = new Room(2, 15);
  const room3 = new Room(3, 10);
  
  floorPlan.addRoom(room1);
  floorPlan.addRoom(room2);
  floorPlan.addRoom(room3);
  
  floorPlan.packRooms();
  
  console.log(floorPlan.rooms);
  