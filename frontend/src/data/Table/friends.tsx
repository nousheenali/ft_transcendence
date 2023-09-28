import { TableRowData } from "@/components/Table/types";
import { userInformation } from "@/components/Profile/types";
import { getFriendsData } from "../../../services/friends";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";

export const generateProfileFriendsData = async(login: string) => {
  const records: TableRowData[] = [];
  const data:userInformation[] = await getFriendsData(login, API_ENDPOINTS.getAllFriends);
  if (Array.isArray(data)) {
    data.map((item: userInformation) =>
      records.push([
        { playerName: item.login, img: item.avatar, name: item.name },
        item.score.toString(),
        `1`,
        `3`,
        `4`,
        { iconName: "icon1", iconImg: "/User_Chat.svg" },
        { iconName: "icon2", iconImg: "/Blocked.svg" },
        { iconName: "icon3", iconImg: "/delete.svg" },
      ])
    );
  }
  return records;
};

// export const generateProfileFriendsData = (numRecords = 100) => {
//   const records = [];

//   for (let i = 1; i <= numRecords; i++) {
//     records.push([
//       { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
//       '1800',
//       `1`,
//       `3`,
//       `4`,
//       { iconName: 'icon1', iconImg: '/User_Chat.svg' },
//       { iconName: 'icon2', iconImg: '/Blocked.svg' },
//       { iconName: 'icon3', iconImg: '/delete.svg' },
//     ]);
//   }

//   return records;
// };
