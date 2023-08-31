export const generateLeaderboardData = (numRecords = 100) => {
  const records = [];

  for (let i = 1; i <= numRecords; i++) {
    records.push([
      `${i}`,
      { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
      `1801`,
      `10`,
      `7`,
      `3`,
    ]);
  }

  return records;
};
