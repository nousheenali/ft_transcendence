import Image from "next/image";
import { TableCellProps } from "./types";
import { API_ENDPOINTS } from "../../../config/apiEndpoints";

import { toast } from "react-toastify";
import {
  createFriendRelation,
  deleteFriendRelation,
  updateFriendRelation,
} from "../../services/friends";
import { useSocket, useChatSocket } from "@/context/store";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

const TableCell: React.FC<TableCellProps> = ({
  dataItem,
  login,
  activeButton,
  reloadPageData,
}) => {
  const { user } = useContext(AuthContext);
  const { currentSocket } = useSocket();
  const { socket } = useChatSocket();

  if (typeof dataItem === "string" && (dataItem === "Win" || dataItem === "Yes")) {
    return (
      <div className="py-2 flex-1 text-center text-win-color">{dataItem}</div>
    );
  }

  if (typeof dataItem === "string" && (dataItem === "Lose" || dataItem === "No")) {
    return (
      <div className="py-2 flex-1 text-center text-lose-color">{dataItem}</div>
    );
  }
  if (typeof dataItem === "string") {
    return <div className="py-2 flex-1 text-center">{dataItem}</div>;
  }
  // checks if there is playerName property in the data item then returns the relevent styles for the cell
  if (dataItem && "playerName" in dataItem) {
    return (
      <div className="py-2 flex-1 text-center">
        <div className="flex-1 flex items-center justify-start pl-8 flex-row">
          <div className="w-12 h-12 mb-2 mr-3 pt-1">
            <Image
              className="rounded-full aspect-[1/1]"
              height={50}
              width={50}
              src={dataItem.img}
              alt="avatar"
            />
          </div>
          <div className="text-left text-main-text font-bold">
            {dataItem.name?.length > 10
              ? `${dataItem.name.substring(0, 15)}..`
              : dataItem.name}
          </div>
        </div>
      </div>
    );
  }

  // Calls the appropriate API end point based on the button clicked and friendid
  const buttonClickEvent = async (friendLogin: string, buttonId: string) => {
    let action;
    let endpoint;

    switch (buttonId) {
      case "ACCEPT":
        action = updateFriendRelation;
        endpoint = API_ENDPOINTS.acceptFriendRequest;
        break;
      case "DECLINE":
        action = deleteFriendRelation;
        endpoint = API_ENDPOINTS.declineFriendRequest;
        break;
      case "ADDFRIEND":
        action = createFriendRelation;
        endpoint = API_ENDPOINTS.sendFriendRequest;
        break;
      case "CANCEL":
        action = deleteFriendRelation;
        endpoint = API_ENDPOINTS.cancelFriendRequest;
        break;
      case "BLOCK":
        action = updateFriendRelation;
        endpoint = API_ENDPOINTS.blockFriend;
        socket.emit("BlockUser", {
          friendLogin: friendLogin,
          userLogin: user.login,
        });
        break;
      case "UNBLOCK":
        action = updateFriendRelation;
        endpoint = API_ENDPOINTS.unBlockFriend;
        break;
      case "UNFRIEND":
        action = deleteFriendRelation;
        endpoint = API_ENDPOINTS.deleteFriend;
        break;
      default:
        break;
    }

    if (action && endpoint) {
      try {
        const message = await action(
          user.login!,
          friendLogin,
          endpoint,
          currentSocket
        );
        reloadPageData(activeButton);
        toast.success(message);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  // if both of the above doesn't match , returns the cell styles to show the action icons
  return (
    <div className="py-2 flex-1 text-center">
      <div className="flex items-center justify-center flex-row hover:cursor-pointer">
        <button onClick={() => buttonClickEvent(login, dataItem.iconName)}>
          <Image
            height={25}
            width={25}
            src={dataItem.iconImg}
            alt="action icon"
          />
        </button>
      </div>
    </div>
  );
};

export default TableCell;
