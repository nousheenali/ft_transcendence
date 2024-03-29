import chalk from 'chalk';
var Table = require('cli-table3');
import { Socket } from 'socket.io';
import { Room, RoomType } from './types';
import { Injectable } from '@nestjs/common';

// =================================================================================================

@Injectable()
export class RoomsService {
  // =================================================================================================
  private clientSockets: Map<string, Socket> = new Map();
  private userRooms: Room[] = [];
  private channelRooms: Room[] = [];

  // =================================================================================================
  // add the user login name as a key and the socket as a value to the clientSockets map
  addClientSocket(userLogin: string, client: Socket) {
    this.clientSockets.set(userLogin, client);
  }
  // =================================================================================================
  // get the socket of the user by his login name
  getClientSocket(userLogin: string) {
    return this.clientSockets.get(userLogin);
  }

  // =================================================================================================
  // Remove a socket from the clientSockets map
  removeClientSocket(userLogin: string) {
    this.clientSockets.delete(userLogin);
  }

  // =================================================================================================
  // print all the users and their sockets
  printAllClientSockets() {
    const table = new Table({
      head: [chalk.yellow('User Login'), chalk.yellow('User Socket ID')],
    });

    this.clientSockets.forEach((socket, login) => {
      table.push([chalk.blue(login), chalk.magenta(socket.id)]);
    });

    console.log(chalk.green('👇 All Client Sockets In clientSockets Map 👇'));
    console.log(table.toString());
  }

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
    return undefined;
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
  joinRoom(
    roomName: string,
    userName: string,
    socket: Socket,
    roomType: RoomType,
  ) {
    if (this.isRoomExist(roomName, roomType)) {
      const room = this.getRoom(roomName, roomType);
      socket.join(roomName);
      if (room.users.indexOf(userName) === -1) room.users.push(userName);
    } else {
      this.createRoom(roomName, userName, roomType);
      socket.join(roomName);
    }
    return this.getRoom(roomName, roomType);
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

  leaveRoom(
    roomName: string,
    userName: string,
    client: Socket,
    roomType: RoomType,
  ) {
    if (this.isRoomExist(roomName, roomType)) {
      const room = this.getRoom(roomName, roomType);
      // 🟣🟣 Remove the user from the room's users array
      if (this.isUserInRoom(roomName, userName, roomType) === true) {
        room.users.splice(room.users.indexOf(userName), 1);
      }
      if (this.isRoomAdmin(roomName, userName, roomType) === true) {
        if (room.users.length > 0) room.admin = room.users[0];
        else this.removeRooms(roomName, roomType);
      }
      // 🟣🟣 Remove the user's socket from the room
      client.leave(roomName);
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
