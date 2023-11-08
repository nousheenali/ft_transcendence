import chalk from "chalk";
import Table from "cli-table3";
import { Socket } from 'socket.io';
import { Room, RoomType } from './types';
import { Injectable } from '@nestjs/common';

// =================================================================================================

@Injectable()
export class RoomsService {
  // =================================================================================================
  private userRooms: Room[] = [];
  private channelRooms: Room[] = [];

  // =================================================================================================

  getRoomIndex(roomName: string, roomType: RoomType) {
    let roomIndex: number = -1;
    if (roomType === 'USERS')
      roomIndex = this.userRooms.findIndex((room) => room.name === roomName);
    else if (roomType === 'CHANNELS')
      roomIndex = this.channelRooms.findIndex((room) => room.name === roomName);
    return roomIndex;
  }

  // =================================================================================================
  getRoom(roomName: string, roomType: RoomType) {
    const roomIndex = this.getRoomIndex(roomName, roomType);
    if (roomIndex !== -1 && roomType === 'USERS')
      return this.userRooms[roomIndex];
    else if (roomIndex !== -1 && roomType === 'CHANNELS')
      return this.channelRooms[roomIndex];
  }

  // =================================================================================================
  isRoomExist(roomName: string, roomType: RoomType) {
    const roomIndex = this.getRoomIndex(roomName, roomType);
    if (roomIndex !== -1) return true;
    else return false;
  }

  // =================================================================================================
  createRoom(roomName: string, admin: string, roomType: RoomType) {
    if (this.isRoomExist(roomName, roomType) === false) {
      const newRoom = {
        name: roomName,
        admin: admin,
        users: [],
      };
      newRoom.users.push(admin);
      if (roomType === 'USERS') this.userRooms.push(newRoom);
      else if (roomType === 'CHANNELS') this.channelRooms.push(newRoom);
    }
    return this.getRoom(roomName, roomType);
  }

  // =================================================================================================
  /**
   * =================================================================================================
   * TODO:
   * =======
   *   ❂➤ Need to be fixed and refactored
   * =================================================================================================
   */
  joinRoom(
    roomName: string,
    userName: string,
    socket: Socket,
    roomType: RoomType,
  ) {
    if (this.isRoomExist(roomName, roomType)) {
      const room = this.getRoom(roomName, roomType);
      if (room.users.indexOf(userName) === -1) {
        socket.join(roomName);
        room.users.push(userName);
      }
    } else {
      this.createRoom(roomName, userName, roomType);
      socket.join(roomName);
    }
    console.log('User: [' + userName + '] joined room: [' + roomName + ']');
  }

  // =================================================================================================
  removeRooms(roomName: string, roomType: RoomType) {
    if (this.isRoomExist(roomName, roomType)) {
      const room = this.getRoom(roomName, roomType);
      if (roomType === 'USERS')
        this.userRooms.splice(this.userRooms.indexOf(room), 1);
      else if (roomType === 'CHANNELS')
        this.channelRooms.splice(this.channelRooms.indexOf(room), 1);
    }
  }

  // =================================================================================================
  getRoomAdmin(roomName: string, roomType: RoomType) {
    if (this.isRoomExist(roomName, roomType)) {
      const room = this.getRoom(roomName, roomType);
      const admin = room.admin;
      return admin;
    }
  }

  // =================================================================================================

  isRoomAdmin(roomName: string, userName: string, roomType: RoomType) {
    if (this.isRoomExist(roomName, roomType)) {
      if (this.getRoomAdmin(roomName, roomType) === userName) return true;
      else return false;
    }
  }

  // =================================================================================================

  isUserInRoom(roomName: string, userName: string, roomType: RoomType) {
    if (this.isRoomExist(roomName, roomType)) {
      const room = this.getRoom(roomName, roomType);
      const userIndex = room.users.findIndex((user) => user === userName);
      if (userIndex !== -1) return true;
      else return false;
    }
  }

  //===============================================================================

  addUserToRoom(roomName: string, userName: string, roomType: RoomType) {
    if (this.isRoomExist(roomName, roomType)) {
      if (this.isUserInRoom(roomName, userName, roomType) === false) {
        const room = this.getRoom(roomName, roomType);
        room.users.push(userName);
      }
    }
  }

  // =================================================================================================

  removeUserFromRoom(roomName: string, userName: string, roomType: RoomType) {
    if (this.isRoomExist(roomName, roomType)) {
      if (this.isUserInRoom(roomName, userName, roomType) === true) {
        const room = this.getRoom(roomName, roomType);
        room.users.splice(room.users.indexOf(userName), 1);
      }
    }
  }

  // =================================================================================================
  printAllRooms() {
    const channelTable = new Table({
      head: [
        chalk.yellow('Room Name'),
        chalk.yellow('Room Admin'),
        chalk.yellow('Room Users'),
      ],
    });
  
    this.channelRooms.forEach((room) => {
      channelTable.push([
        chalk.blue(room.name),
        chalk.magenta(room.admin),
        chalk.green(room.users.join(', ')),
      ]);
    });
  
    const userTable = new Table({
      head: [
        chalk.cyan('Room Name'),
        chalk.cyan('Room Admin'),
        chalk.cyan('Room Users'),
      ],
    });
  
    this.userRooms.forEach((room) => {
      userTable.push([
        chalk.blue(room.name),
        chalk.magenta(room.admin),
        chalk.green(room.users.join(', ')),
      ]);
    });
  
    console.log(chalk.green('👇 Channels Rooms 👇'));
    console.log(channelTable.toString());
  
    console.log(chalk.green('👇 Users Rooms 👇'));
    console.log(userTable.toString());
  }
  // =================================================================================================
}
