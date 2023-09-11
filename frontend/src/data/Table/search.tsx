
export const generateProfileSearchData = (numRecords = 100) => {
  const records = [];

  for (let i = 1; i <= numRecords; i++) {
    records.push([
      { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
      "1800",
      `1`,
      `3`,
      `4`,
      { iconName: "icon2", iconImg: "/user-add.svg" },
    ]);
  }

  return records;
};
