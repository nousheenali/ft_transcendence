export const API_ENDPOINTS = {
  //USER module
  getUserbyLogin: '/user/getByLogin/',
  getUserbyId: '/user/getById/',

  //FRIENDS module
  getAllFriends: '/friends/allFriends/',
  getNonFriends: '/friends/nonFriends/',
  getBlockedFriends: '/friends/blockedList/',
  incomingRequests: '/friends/incomingRequests/',
  outgoingRequests: '/friends/outgoingRequests/',
  sendFriendRequest: '/friends/sendFriendRequest/',
  cancelFriendRequest: '/friends/cancelFriendRequest/',
  deleteFriend: '/friends/deleteFriend/',
  acceptFriendRequest: '/friends/acceptRequest/',
  declineFriendRequest: '/friends/declineRequest/',
  blockFriend: '/friends/block/',
  unBlockFriend: '/friends/unBlock/',
  generateSecret: '/two-fa/generateSecret',
  verifyTwoFa: '/two-fa/verify',
};
