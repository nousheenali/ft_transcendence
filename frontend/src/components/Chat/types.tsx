/*-------------------------------------------------------------------*/
/*------------ All the Types required in Chat page ------------------*/
/*-------------------------------------------------------------------*/

/**
 * Interface for the MessageProps component props, which are:
 *
 * {sender} is an object that contains the following properties:
 *    {name} is a string that contains the name of the sender
 *    {profileImage} is an object that contains the following properties:
 *       {alt} is a string that contains the alt text for the profile image
 *       {src} is a string that contains the source of the profile image
 *    {isOnline} is a boolean that determines whether the sender is online or not
 * {messageTime} is a string that contains the time the message was sent
 * {messageContent} is a string that contains the content of the message
 */

export interface MessageProps {
  sender: {
    name: string;
    profileImage: {
      alt: string;
      src: string;
    };
    isOnline: boolean;
  };
  messageTime: string;
  messageContent: string;
}

/*-------------------------------------------------------------------*/
/**
 * Interface for the ChatFriends component props, which are:
 *
 * {friend} is an object that contains the following properties:
 *    {name} is a string that contains the name of the friend
 *    {isOnline} is a boolean that determines whether the friend is online or not
 *    {profileImage} is an object that contains the following properties:
 *       {alt} is a string that contains the alt text for the profile image
 *       {src} is a string that contains the source of the profile image
 */
export interface ChatFriendsProps {
  friend: {
    name: string;
    isOnline: boolean;
    profileImage: {
      alt: string;
      src: string;
    };
  };
}

/*-------------------------------------------------------------------*/
/**
 * Interface for the MsgChannelBtn component props, which are:
 *
 * {activeTab} is a string that can be either "Messages" or "Channels"
 * {setActiveTab} is a function that takes a string as an argument and sets the activeTab state to that string
 */
export interface MsgChannelBtnProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

/*-------------------------------------------------------------------*/
/**
 * Interface for the ChannelsBtn component props, which are:
 *
 * {activeTab} is a string that can be either "Public" or "Private"
 * {setActiveTab} is a function that takes a string as an argument and sets the activeTab state to that string
 */
export interface ChannelsBtn {
  activeChannel: string;
  setActiveChannel: React.Dispatch<React.SetStateAction<string>>;
}

/*-------------------------------------------------------------------*/