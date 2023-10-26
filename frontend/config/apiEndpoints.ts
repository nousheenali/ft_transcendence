export const API_ENDPOINTS = {
  //USER module
  getUserbyLogin: "/user/getByLogin/",
  getUserbyId: "/user/getById/",

  //FRIENDS module
  getAllFriends: "/friends/allFriends/",
  getNonFriends: "/friends/nonFriends/",
  getBlockedFriends: "/friends/blockedList/",
  incomingRequests: "/friends/incomingRequests/",
  outgoingRequests: "/friends/outgoingRequests/",
  sendFriendRequest: "/friends/sendFriendRequest/",
  cancelFriendRequest: "/friends/cancelFriendRequest/",
  deleteFriend: "/friends/deleteFriend/",
  acceptFriendRequest: "/friends/acceptRequest/",
  declineFriendRequest: "/friends/declineRequest/",
  blockFriend: "/friends/block/",
  unBlockFriend: "/friends/unBlock/",

  //CHANNEL module
  // end point for getting all channels that the user have relation with.
  allChannels: "/channel/all-channels/",

  // User Messsages
  // end point for getting all messages of a user.
  userMessages: "/user-messages/received/",

};
