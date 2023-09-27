

import { userInformation } from "@/components/Profile/types";
import { getData } from "../../../services/api";
import { TableRowData } from "@/components/Table/types";

export const generateProfileSearchData = async (login:string) => {
  const records: TableRowData[] = [];
  const data: userInformation[] = await getData(login, "/friends/nonFriends/");
  
  if (Array.isArray(data)) 
  {
    data.map((item: userInformation) =>
    records.push([
      { playerName: item.login, img: item.avatar, name: item.name },
      item.score.toString(),
      `1`,
      `3`,
      `4`,
      { iconName: "icon2", iconImg: "/user-add.svg" },
    ])
    );
  }
  return records;
};

// export const generateProfileSearchData = (numRecords = 100) => {
//   const records = [];

//   for (let i = 1; i <= numRecords; i++) {
//     records.push([
//       { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
//       "1800",
//       `1`,
//       `3`,
//       `4`,
//       { iconName: "icon2", iconImg: "/user-add.svg" },
//     ]);
//   }

//   return records;
// };



// export const generateProfileSearchData = (numRecords = 100) => {
//   const records = [];

//   for (let i = 1; i <= numRecords; i++) {
//     records.push([
//       { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
//       "1800",
//       `1`,
//       `3`,
//       `4`,
//       { iconName: "icon2", iconImg: "/user-add.svg" },
//     ]);
//   }

//   return records;
// };
