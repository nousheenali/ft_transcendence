import { Injectable } from '@nestjs/common';

//===============================================================================
interface User {
  login: string | string[];
}

interface Room {
  name: string;
  admin: string;
  users: User[];
}

/**
 * Class that will handle all the rooms services for the private message
 * and channels chat.
 */
@Injectable()
export class RoomsService {
  //===============================================================================
  private rooms: Room[] = [];

  //===============================================================================
  getRoomIndex(roomName: string) {
    const roomIndex = this.rooms.findIndex((room) => room.name === roomName);
    return roomIndex;
  }

  //===============================================================================
  createRoom(roomName: string, admin: string) {
    const roomIndex = this.getRoomIndex(roomName);
    if (roomIndex === -1) {
      const newRoom = {
        name: roomName,
        admin: admin,
        users: [],
      };
      newRoom.users.push(admin);
      this.rooms.push(newRoom);
    }
  }

  //===============================================================================
}
