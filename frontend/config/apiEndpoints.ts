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

  /**==============================================================================================
   * ╭── 🌼
   * ├ 👇 All the Channels endpoints
   * └── 🌼
   **/
  allChannels: "/channels/all-channels/",
  privateChannels: "/channels/private-channels/",
  publicChannels: "/channels/public-channels/",
  channelUsers: "/channels/users/",
  channelMessages: "/channels/messages/",
  createChannel: "/channels/create/",
  deleteChannel: "/channels/delete/",

  /**==============================================================================================
   * ╭── 🌼
   * ├ 👇 User Messages endpoints
   * └── 🌼
   **/
  userMessages: "/user-messages/friend-chat/",
  userLatestMessages: "/user-messages/latest-messages/",
};
