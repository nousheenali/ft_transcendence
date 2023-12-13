export const generateLiveGamesData = (numRecords = 100) => {
  const records = [];

  for (let i = 1; i <= numRecords; i++) {
    records.push([
      { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
      "1800",
      { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
    ]);
  }

  return records;
};
