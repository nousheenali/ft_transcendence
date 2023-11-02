import { Injectable } from '@nestjs/common';
import { Room } from './types';
import { Socket } from 'socket.io';

//===============================================================================
/**
 * ❂➤ Class that will handle all the rooms services for the private message
 * and channels chat.
 */
@Injectable()
export class RoomsService {
  //===============================================================================
  // ❂➤ Array that will store the rooms that have been created.
  private rooms: Room[] = [];

  //===============================================================================
  /**
   * ❂➤ return the rooms index from rooms array.
   * @param roomName
   * @returns the index of the desired room in the rooms array.
   */
  getRoomIndex(roomName: string) {
    const roomIndex = this.rooms.findIndex((room) => room.name === roomName);
    return roomIndex;
  }

  //===============================================================================
  /**
   * ❂➤ return the room from the rooms array according to the room name.
   **/
  getRoom(roomName: string) {
    const roomIndex = this.getRoomIndex(roomName);
    if (roomIndex !== -1) return this.rooms[roomIndex];
  }

  //===============================================================================
  /**
   * ❂➤ return true if the room exist in the rooms array, else return false.
   **/
  isRoomExist(roomName: string) {
    const roomIndex = this.getRoomIndex(roomName);
    if (roomIndex !== -1) return true;
    else return false;
  }

  //===============================================================================
  /**
   * ❂➤ create a room with the name and the admin, and add the admin to the users array
   * @param roomName
   * @param admin
   */
  createRoom(roomName: string, admin: string) {
    if (this.isRoomExist(roomName) === false) {
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
  /**
   * create a room if it doesn't exist and join the user to the room
   * @param roomName
   * @param userName the login name for the user that want to join the room
   * @param socket the socket of the client that want to join the room
   */
  joinRoom(roomName: string, userName: string, socket: Socket) {
    if (this.isRoomExist(roomName)) {
      const room = this.getRoom(roomName);
      if (room.users.indexOf(userName) === -1) {
        socket.join(roomName);
        room.users.push(userName);
      }
    } else {
      this.createRoom(roomName, userName);
      socket.join(roomName);
    }
  }

  //===============================================================================
  /**
   * ❂➤ remove the room from the rooms array if the room exist in the array
   * and it is empty
   */
  removeRooms(roomName: string) {
    if (this.isRoomExist(roomName)) {
      const room = this.getRoom(roomName);
      if (room.users.length === 0)
        this.rooms.splice(this.rooms.indexOf(room), 1);
    }
  }

  //===============================================================================
  /**
   * ❂➤ return the admin of the room:
   * for the channels: return the channel creator
   * for the private message: return the user that send the message
   */
  getRoomAdmin(roomName: string) {
    if (this.isRoomExist(roomName)) {
      const room = this.getRoom(roomName);
      const admin = room.admin;
      return admin;
    }
  }

  //===============================================================================
  /**
   * ❂➤ return true if the user is the admin of the room, else return false.
   **/
  isRoomAdmin(roomName: string, userName: string) {
    if (this.isRoomExist(roomName)) {
      if (this.getRoomAdmin(roomName) === userName) return true;
      else return false;
    }
  }

  //===============================================================================
  /**
   * ❂➤ return true if the user is in the room, else return false.
   **/
  isUserInRoom(roomName: string, userName: string) {
    if (this.isRoomExist(roomName)) {
      const room = this.getRoom(roomName);
      const userIndex = room.users.findIndex((user) => user === userName);
      if (userIndex !== -1) return true;
      else return false;
    }
  }

  //===============================================================================
  /**
   * ❂➤ add the user to the room if the room exist and the user is not in the room.
   **/
  addUserToRoom(roomName: string, userName: string) {
    if (this.isRoomExist(roomName)) {
      if (this.isUserInRoom(roomName, userName) === false) {
        const room = this.getRoom(roomName);
        room.users.push(userName);
      }
    }
  }

  //===============================================================================
  /**
   * ❂➤ remove user from the room if the room exist and the user is in the room.
   **/
  removeUserFromRoom(roomName: string, userName: string) {
    if (this.isRoomExist(roomName)) {
      if (this.isUserInRoom(roomName, userName) === true) {
        const room = this.getRoom(roomName);
        room.users.splice(room.users.indexOf(userName), 1);
      }
    }
  }

  //===============================================================================
  printAllRooms() {
    console.log('----------------------------------------------------------------');
    console.log('[' + this.rooms.length + '] rooms exists');
    this.rooms.forEach(room=>console.log(room));
    console.log('----------------------------------------------------------------');
  }
  //===============================================================================
}
