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
  blockedByList: "/friends/blocked-by-list/", // + login
  blockedLogins: "/friends/blocked-logins/", // + login
  /**==============================================================================================
   * ╭── 🟣
   * ├ 👇 All the Channels endpoints
   * └── 🟣
   **/
  isUserMuted: "/channels/channel-property/is-muted/",
  allChannels: "/channels/all-channels/",
  privateChannels: "/channels/private-channels/",
  publicChannels: "/channels/public-channels/",
  oneChannel: "/channels/current-channel/",
  channelUsers: "/channels/users/",
  channelMessages: "/channels/messages/",
  createChannel: "/channels/create/",
  deleteChannel: "/channels/delete/",

  /**==============================================================================================
   * ╭── 🟣
   * ├ 👇 User Messages endpoints
   * └── 🟣
   **/
  userMessages: "/user-messages/friend-chat/",
  userLatestMessages: "/user-messages/latest-messages/",
  /**==============================================================================================
   * ╭── 🟣
   * ├ 👇 User Games endpoints
   * └── 🟣
   **/
  gamesHistory: "/games/history/",
};
