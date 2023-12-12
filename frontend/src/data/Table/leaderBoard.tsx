import { userInformation } from "@/components/Profile/types";
import { TableRowData } from "@/components/Table/types";
import { getAllUsersData } from "../../services/user";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";

export const generateLeaderboardData = async (
  login: string,
  numRecords = 100
) => {
  const records: TableRowData[] = [];
  const data: userInformation[] = await getAllUsersData(
    login,
    API_ENDPOINTS.getAllUsers
  );
  let i = 1;
  if (Array.isArray(data)) {
    data.map((item: userInformation) => {
      records.push([
        `${i}`,
        { playerName: item.login, img: item.avatar, name: item.name },
        item.score.toString(),
        (item.wins + item.losses).toString(),
        item.wins.toString(),
        item.losses.toString(),
      ]);
      i++;
    });
  }
  return records;
};
