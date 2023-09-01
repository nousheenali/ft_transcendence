export const generateProfileFriendsData = (numRecords = 100) => {
  const records = [];

  for (let i = 1; i <= numRecords; i++) {
    records.push([
      { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
      '1800',
      `1`,
      `3`,
      `4`,
      { iconName: 'icon1', iconImg: '/User_Chat.svg' },
      { iconName: 'icon2', iconImg: '/Blocked.svg' },
      { iconName: 'icon3', iconImg: '/delete.svg' },
    ]);
  }

  return records;
};
