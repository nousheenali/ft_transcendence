import { userInformation } from "@/components/Profile/types";
import { TableRowData } from "@/components/Table/types";
import { getFriendsData } from "../../services/friends";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";

export const generateProfileSearchData = async (
  login: string
): Promise<TableRowData[]> => {
  const records: TableRowData[] = [];
  const data: userInformation[] = await getFriendsData(
    login,
    API_ENDPOINTS.getNonFriends
  );
  if (Array.isArray(data)) {
    data.map((item: userInformation) =>
      records.push([
        { playerName: item.login, img: item.avatar, name: item.name },
        item.score.toString(),
        (item.wins + item.losses).toString(),
        item.wins.toString(),
        item.losses.toString(),
        { iconName: "ADDFRIEND", iconImg: "/user-add.svg" },
      ])
    );
  }
  return records;
};
