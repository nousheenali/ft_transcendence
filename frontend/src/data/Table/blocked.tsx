import { TableRowData } from "@/components/Table/types";
import { userInformation } from "@/components/Profile/types";
import { getFriendsData } from "../../../services/friends";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";

export const generateProfileBlockedData = async(login: string) => {
  const records: TableRowData[] = [];
  const data: userInformation[] = await getFriendsData(login, API_ENDPOINTS.getBlockedFriends);
  if (Array.isArray(data)) {
    data.map((item: userInformation) =>
      records.push([
        { playerName: item.login, img: item.avatar, name: item.name },
        item.score.toString(),
        `1`,
        `3`,
        `4`,
        { iconName: "UNBLOCK", iconImg: "/unblock.svg" },
        { iconName: "UNFRIEND", iconImg: "/delete.svg" },
      ])
    );
  }
  return records;
};

