import { Injectable } from '@nestjs/common';

//===============================================================================
/**
 * ❂➤ Rooms interface:
 * name: name of the room
 * 			=>(channel name or user login name)
 * admin: the user that created the room
 * 			=>(channel creator or user that send the private message)
 * users: array of users in the room 
 * 			=>(channel users or only the user that send the private message)
 */
interface Room {
  name: string;
  admin: string;
  users: string[];
}

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
   * ❂➤ create a room with the name and the admin, and add the admin to the users array
   * @param roomName
   * @param admin
   */
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
  /**
   * ❂➤ remove the room from the rooms array if the room exist in the array 
   * and it is empty
   */
  removeRooms(roomName: string) {
	const roomIndex = this.getRoomIndex(roomName);
	if (roomIndex !== -1) {
		if (this.rooms[roomIndex].users.length === 0)
			this.rooms.splice(roomIndex, 1);
	}
  }

  //===============================================================================
  /**
   * ❂➤ return the admin of the room:
   * for the channels: return the channel creator
   * for the private message: return the user that send the message
   */
  getRoomAdmin(roomName: string) {
	const roomIndex = this.getRoomIndex(roomName);
	if (roomIndex !== -1) {
		const admin = this.rooms[roomIndex].admin;
		return admin;
	}
  }

  //===============================================================================
  addUserToRoom(roomName: string, user: string) {

  }

  //===============================================================================


  //===============================================================================

}
