import { TableRowData } from "@/components/Table/types";
import { userInformation } from "@/components/Profile/types";
import { getFriendsData } from "../../../services/friends";

export const generateProfileBlockedData = async(login: string) => {
  const records: TableRowData[] = [];
  const data: userInformation[] = await getFriendsData(login, "/friends/blockedList/");
  if (Array.isArray(data)) {
    data.map((item: userInformation) =>
      records.push([
        { playerName: item.login, img: item.avatar, name: item.name },
        item.score.toString(),
        `1`,
        `3`,
        `4`,
        { iconName: "icon2", iconImg: "/unblock.svg" },
        { iconName: "icon3", iconImg: "/delete.svg" },
      ])
    );
  }
  return records;
};

// export const generateProfileBlockedData = (numRecords = 100) => {
//   const records = [];

//   for (let i = 1; i <= numRecords; i++) {
//     records.push([
//       { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
//       '1800',
//       `1`,
//       `3`,
//       `4`,
//       { iconName: 'icon2', iconImg: '/unblock.svg' },
//       { iconName: 'icon3', iconImg: '/delete.svg' },
//     ]);
//   }

//   return records;
// };
