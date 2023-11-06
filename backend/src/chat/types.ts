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
export interface Room {
	name: string;
	admin: string;
	users: string[];
  }

//===============================================================================
export interface Message {
	socketId: string;
	sender: string;
	receiver?: string;
	channel?: string;
	channelType?: string;
	message: string;
  }
  
//===============================================================================
export type RoomType = "CHANNELS" | "USERS";

//==============================================================================